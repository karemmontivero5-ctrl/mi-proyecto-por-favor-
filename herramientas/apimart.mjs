// apimart.mjs · genera imágenes y videos con API Mart y los baja a tu carpeta.
// La clave vive FUERA del proyecto: ~/.secretos/apimart.env con la línea APIMART_API_KEY=tu_clave
//
// Uso (desde la carpeta del proyecto):
//   node herramientas/apimart.mjs saldo
//   node herramientas/apimart.mjs precio <modelo>
//   node herramientas/apimart.mjs imagen <salida.png> "<prompt>" [--model=gemini-3-pro-image-preview] [--size=9:16] [--res=2K] [--ref=a.png,b.png]
//   node herramientas/apimart.mjs video  <salida.mp4> "<prompt>" [--model=seedance-2.0-mini] [--dur=5] [--res=720p] [--ar=9:16] [--imagen=primer-cuadro.png]
//   node herramientas/apimart.mjs avatar <salida.mp4> "<prompt>" --imagen=escena.png [--res=720p]
//   node herramientas/apimart.mjs lote <pedidos.json>   (lista de {tipo: "imagen"|"video"|"avatar", salida, prompt, ...}; de a 3)
//
// Cada modelo acepta campos distintos: antes de usar uno nuevo, leer su página en https://docs.apimart.ai
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ARCHIVO_CLAVE = path.join(os.homedir(), '.secretos', 'apimart.env');
const KEY = fs.existsSync(ARCHIVO_CLAVE) ? fs.readFileSync(ARCHIVO_CLAVE, 'utf8').match(/APIMART_API_KEY=(\S+)/)?.[1] : null;
const BASE = 'https://api.apimart.ai';
const H = {Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json'};
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const COSTOS = path.resolve('recursos/costos.csv');

function conClave() {
  if (!KEY || KEY === 'PEGAR_ACA') throw new Error(`Falta la clave en ${ARCHIVO_CLAVE} (línea APIMART_API_KEY=...)`);
}
const opciones = (args) => Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')));

async function saldo() {
  conClave();
  const j = await (await fetch(`${BASE}/v1/user/balance`, {headers: H})).json();
  return j.remain_balance ?? j.data?.remain_balance ?? j;
}

async function precio(modelo) {
  const j = await (await fetch(`${BASE}/api/pricing/model?model=${encodeURIComponent(modelo)}`)).json();
  const d = j.data ?? {};
  return {modelo, precio_lista: d.model_price, precio_tuyo: d.paid_price, cobra: d.billing_type ?? 'por pedido'};
}

// Sube una imagen local y devuelve su URL (para primer cuadro o referencia).
async function subir(archivo) {
  const fd = new FormData();
  const tipo = archivo.toLowerCase().endsWith('.jpg') || archivo.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png';
  fd.append('file', new Blob([fs.readFileSync(archivo)], {type: tipo}), path.basename(archivo));
  const j = await (await fetch(`${BASE}/v1/uploads/images`, {method: 'POST', headers: {Authorization: H.Authorization}, body: fd})).json();
  if (!j.url) throw new Error(`no se pudo subir ${archivo}: ${JSON.stringify(j).slice(0, 200)}`);
  return j.url;
}

async function pedir(ruta, cuerpo, salida) {
  const r = await fetch(`${BASE}${ruta}`, {method: 'POST', headers: H, body: JSON.stringify(cuerpo)});
  const j = await r.json();
  const id = j?.data?.[0]?.task_id ?? j?.data?.task_id;
  if (!id) throw new Error(`${path.basename(salida)}: rechazado ${r.status} ${JSON.stringify(j).slice(0, 300)}`);
  // Anotar el pedido apenas sale: si la descarga falla, se recupera con este id sin volver a pagar.
  console.log(`→ ${path.basename(salida)}: pedido ${id}`);
  fs.mkdirSync(path.dirname(COSTOS), {recursive: true});
  fs.appendFileSync(path.join(path.dirname(COSTOS), 'pedidos.log'), `${new Date().toISOString()} ${id} ${salida}\n`);
  return id;
}

async function esperarArchivo(id, salida, extension) {
  const t0 = Date.now();
  for (;;) {
    await esperar(6000);
    const d = (await (await fetch(`${BASE}/v1/tasks/${id}`, {headers: H})).json()).data ?? {};
    if (['completed', 'succeeded', 'success'].includes(d.status)) {
      const url = JSON.stringify(d).match(new RegExp(`https?:[^"]+?\\.(?:${extension})[^"]*`, 'i'))?.[0];
      if (!url) throw new Error(`${path.basename(salida)}: terminó sin archivo ${JSON.stringify(d).slice(0, 300)}`);
      fs.mkdirSync(path.dirname(path.resolve(salida)), {recursive: true});
      fs.writeFileSync(salida, Buffer.from(await (await fetch(url)).arrayBuffer()));
      console.log(`✓ ${salida} (${Math.round((Date.now() - t0) / 1000)} s)`);
      return salida;
    }
    if (['failed', 'error', 'cancelled'].includes(d.status)) throw new Error(`${path.basename(salida)}: falló ${JSON.stringify(d).slice(0, 400)}`);
    if (Date.now() - t0 > 15 * 60 * 1000) throw new Error(`${path.basename(salida)}: más de 15 min esperando (${id})`);
  }
}

async function imagen({salida, prompt, model = 'gemini-3-pro-image-preview', size = '9:16', res, ref}) {
  const cuerpo = {model, prompt, size, n: 1};
  if (res) cuerpo.resolution = res;
  if (ref) cuerpo.image_urls = await Promise.all(String(ref).split(',').map((f) => subir(f.trim())));
  return esperarArchivo(await pedir('/v1/images/generations', cuerpo, salida), salida, 'png|jpe?g|webp');
}

async function video({salida, prompt, model = 'seedance-2.0-mini', res = '720p', dur = 5, ar = '9:16', imagen: img}) {
  const cuerpo = {model, prompt, duration: Number(dur), aspect_ratio: ar, resolution: res};
  if (img) cuerpo.image_urls = [await subir(img)];
  return esperarArchivo(await pedir('/v1/videos/generations', cuerpo, salida), salida, 'mp4');
}

// Avatar que habla: Omni anima la escena con voz. La escena va como primer cuadro.
async function avatar({salida, prompt, imagen: img, res = '720p'}) {
  if (!img) throw new Error('avatar necesita --imagen=escena.png');
  const cuerpo = {model: 'gemini-omni-1.1-flash', prompt, aspect_ratio: '9:16', resolution: res,
    image_with_roles: [{url: await subir(img), role: 'first_frame'}]};
  return esperarArchivo(await pedir('/v1/videos/generations', cuerpo, salida), salida, 'mp4');
}

function anotar(accion, detalle, costo) {
  fs.mkdirSync(path.dirname(COSTOS), {recursive: true});
  if (!fs.existsSync(COSTOS)) fs.writeFileSync(COSTOS, 'fecha,accion,detalle,costo_usd\n');
  fs.appendFileSync(COSTOS, `${new Date().toISOString()},${accion},"${detalle}",${costo.toFixed(4)}\n`);
}

const HACER = {imagen, video, avatar};
const [accion, ...resto] = process.argv.slice(2);
const sueltos = resto.filter((a) => !a.startsWith('--'));

if (accion === 'saldo') console.log('saldo US$', await saldo());
else if (accion === 'precio') console.log(await precio(sueltos[0]));
else if (HACER[accion]) {
  const [salida, prompt] = sueltos;
  const antes = Number(await saldo());
  await HACER[accion]({salida, prompt, ...opciones(resto)});
  const costo = antes - Number(await saldo());
  anotar(accion, salida, costo);
  console.log(`costo US$ ${costo.toFixed(4)}`);
} else if (accion === 'lote') {
  const pedidos = JSON.parse(fs.readFileSync(sueltos[0], 'utf8')).filter((p) => !fs.existsSync(p.salida));
  const antes = Number(await saldo());
  const fallas = [];
  for (let i = 0; i < pedidos.length; i += 3) {
    const tanda = pedidos.slice(i, i + 3);
    const r = await Promise.allSettled(tanda.map((p) => (HACER[p.tipo ?? 'video'])(p)));
    r.forEach((x) => x.status === 'rejected' && fallas.push(x.reason.message));
  }
  const costo = antes - Number(await saldo());
  anotar('lote', sueltos[0], costo);
  console.log(`listos ${pedidos.length - fallas.length}/${pedidos.length} · costo US$ ${costo.toFixed(4)}`);
  fallas.forEach((f) => console.log('✗', f));
} else {
  console.log('Uso: apimart.mjs saldo | precio <modelo> | imagen|video|avatar <salida> "<prompt>" [--opciones] | lote <pedidos.json>');
}
