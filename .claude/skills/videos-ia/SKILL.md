---
name: videos-ia
description: Crea anuncios de video verticales con IA desde cero en dos formatos, avatar que habla a cámara y b-roll con voz en off. Escribe el guion, arma las imágenes, genera los clips en Google Flow o por API Mart, consigue tomas reales (bancos con licencia y TikTok), edita con ffmpeg + Whisper y revisa todo antes de entregar. Usala cuando pidan "video con avatar", "b-roll", "anuncio en video", "bajá videos de TikTok", "generá clips con API Mart" o prompts para Flow.
---

# Videos con IA desde cero

## Reglas de plata (antes que nada)
- Nunca gastar sin tope aprobado. Antes de generar: costo pieza por pieza y total, y esperar el OK del usuario con el tope.
- Flow primero (sus créditos vienen con el plan de Google del usuario). API Mart cuando Flow no alcanza o hace falta automatizar.
- Un clip de prueba antes de la tanda, mirado y escuchado entero. Un video de punta a punta antes de hacer el resto.
- Se regenera solo lo que falló, nunca la tanda.
- No crear cuentas, no cargar tarjetas, no publicar anuncios ni tocar la cuenta publicitaria.

## Carpetas
videos/[producto]/[video]/ con guion.json, guion-grafico.md, imagenes/, clips/, voz/, tomas/ y _trabajo/
recursos/ con fonts/, stickers/, musica/, CREDITOS.md y costos.csv
herramientas/apimart.mjs
salida/[producto]/ con los MP4 terminados
La clave de API Mart vive FUERA del proyecto: ~/.secretos/apimart.env (APIMART_API_KEY=...). Nunca se copia al proyecto, al chat ni a git. El usuario la pega a mano en ese archivo.

## Instalación (una vez, pidiendo permiso)
- Node 18 o más nuevo. Python 3 con numpy, opencv-python y pillow.
- ffmpeg COMPLETO: Windows "winget install Gyan.FFmpeg", Mac "brew install ffmpeg". Verificar libass (subtítulos) y rubberband (tono): ffmpeg -filters | grep -E "subtitles|rubberband".
- Whisper con tiempos por palabra: whisper.cpp modelo medium, o faster-whisper (si se le pasa audio propio, a 16 kHz; si no, los tiempos salen corridos).
- yt-dlp (pip install -U yt-dlp), para TikTok. Actualizarlo cuando deje de bajar.
- Fuente Poppins Black (Google Fonts, OFL) en recursos/fonts/. Emojis Noto en PNG en recursos/stickers/.

## API Mart
- Base https://api.apimart.ai, header "Authorization: Bearer [clave]". Documentación de cada modelo: https://docs.apimart.ai. Leerla antes de usar un modelo por primera vez: cada uno acepta campos distintos.
- Flujo: POST /v1/videos/generations (o /v1/images/generations) → devuelve task_id → GET /v1/tasks/[task_id] cada 5-8 s hasta "completed" → bajar la URL del archivo.
- Imagen local como primer cuadro o referencia: POST /v1/uploads/images (multipart, campo "file") → devuelve url.
- Saldo: GET /v1/user/balance. Precio: GET /api/pricing/model?model=[nombre] (no pide clave).
- Costo real: saldo antes y después de cada pedido, anotado en recursos/costos.csv.
- Modelos: gemini-omni-1.1-flash (avatar que habla; cobra por segundo; la duración la decide el modelo, 3-10 s; primer cuadro con image_with_roles [{url, role:"first_frame"}]) · veo3.1-lite y veo3.1-fast (escenas de 8 s) · seedance-2.0-mini (b-roll barato, sin audio, por segundo) · gemini-3-pro-image-preview o Nano Banana Pro (imágenes con referencias de la misma persona) · seedream-4-5 (imágenes rápidas). Releer precios antes de cada tanda: cambian.
- Por API no hay "voz guardada": la voz se describe con el MISMO texto en todos los clips del video y después se mide el tono.
- De a 3 pedidos en paralelo. Si uno falla, se reintenta solo ese.
- Script: herramientas/apimart.mjs (saldo, precio, imagen, video, avatar, lote).

## Antes de cada video
- Leer la landing publicada HOY. Precio, garantía, bonos, módulos y texto del botón salen de ahí. Lo que falte: [COMPLETAR] y preguntar.
- Un ángulo por video (dolor, deseo, tiempo, dinero, estatus, curiosidad o mito, objeción). En una tanda, cada video prueba uno distinto.
- Una sola persona gramatical en todo (vos o tú, lo que pida el usuario). Ortografía perfecta.
- Elegir formato: AVATAR (alguien habla a cámara) o B-ROLL (voz en off + historia con tomas).

## Reglas del guion (los dos formatos)
- El gancho se ve y se oye en el primer segundo: la voz arranca antes de 0,5 s y el cuadro 0 ya muestra el problema o el resultado. Primera frase de 12 palabras o menos.
- Habla del mundo del comprador (una situación, una historia, un error común), no recita la landing. El producto entra como la salida.
- Sin precio ni descuento en voz ni en pantalla: el precio vive en la landing.
- Nada inventado: ni testimonios con resultados, ni cupos, ni urgencias, ni cifras que la landing no tenga, ni antes y después.
- Política de Meta: no afirmar atributos personales del que mira ("si tenés 40 años", "si estás endeudado"). Que lo cuente el personaje de sí mismo.
- El protagonista es el comprador: si el producto es para un oficio, persona y lugar de ese oficio; si es general, una persona común en su oficina, casa o negocio.
- Palabras que la IA pronuncia mal (marcas, inglés): escritas como suenan en el prompt de video; en los subtítulos, bien escritas.
- Largo medido con código: avatar, bloques de 160 caracteres como máximo; b-roll, 120-140 palabras.

## A. Avatar que habla
1. Guion en bloques: cada bloque es un clip de 8 s con 160 caracteres como máximo (ideal 120-150). Si no entra, dos bloques. Esqueleto: B1 gancho que dice para quién es · B2 problema con tres cosas concretas del día del cliente · B3 solución con nombre · B4 objeción destruida + oferta de la landing · B5 llamado: eco del dolor + acción + destino. Por API Mart, 3-4 bloques; en Flow, hasta 7.
2. Foto maestra del avatar (PLANTILLA A). Controlar manos, dientes, ojos, piel con poros, sin texto. Si algo falla, se rehace: todo hereda sus defectos.
3. Una escena por bloque (PLANTILLA B) con la maestra como referencia: otro rincón o pose, misma persona y ropa. Selfie: un solo lugar, sin celular en la mano (el celular ES la cámara). La prueba o el producto, sostenido frente al pecho.
4. Animar cada escena (PLANTILLA C). En Flow: Ingredientes + la misma voz en todos los clips. Por API Mart: gemini-omni-1.1-flash con la escena como primer cuadro y el mismo perfil de voz escrito en todos. Sin comillas en la acción (Omni escribe en pantalla lo citado). Cámara fija.
5. Revisar cada clip antes de editar: transcribirlo y compararlo con el bloque (palabras repetidas, colas inventadas, frases cortadas → regenerar ese clip); misma voz (tono medio F0 por clip; marcar el que se aparte más de 12 % de la mediana y escuchar); hoja de cuadros: misma persona y ropa, manos bien, sin texto ni logos; primer cuadro contra último (si la cámara se acerca o aleja, regenerar).
6. Editar a 24 cuadros por segundo los clips de Flow (a 30 se repite uno de cada cinco). Plano fijo. Cada empalme adentro de un mismo clip, tapado con una toma de 0,3-0,4 s, una pantalla o un gráfico.

## B. B-roll con voz en off
1. Historia con un protagonista (el mismo de punta a punta): dolor → giro → el producto → resultado. Cada tramo en otro lugar, hora o situación; nunca tres escenas seguidas en el mismo lugar. El gancho abre una pregunta que el final cierra.
2. Guion de 120-140 palabras (45-54 s). Ritmo final de 2,8-4 palabras por segundo.
3. Voz en Google AI Studio (texto a voz): la dirección va en el campo de estilo, nunca en el texto (lo lee en voz alta). Una sola voz y una sola fuente en todo el video.
4. Whisper sobre la voz → tiempos de cada frase.
5. Guion gráfico ANTES de generar: una fila por frase con plano, qué hace, qué siente, lugar y hora. La emoción y la luz siguen la historia (el problema no sonríe). El usuario lo aprueba.
6. Tomas, en este orden: bancos con licencia (Pexels; Mixkit SOLO "Stock Video Free License", las "Restricted" prohíben anuncios y salen mezcladas) → TikTok sin texto (parte C) → IA. Búsquedas en inglés. Nada de stock horizontal agrandado más de 1,1×. Ninguna toma dos veces en un video.
7. Tomas con IA, misma persona: foto maestra (PLANTILLA A) → hoja de personaje (frente, perfil, cuerpo entero) → foto maestra de cada lugar → cada toma con [hoja + lugar] y la PLANTILLA D. Escribir la geometría de pantallas en cada toma ("la laptop de perfil, como una L; la pantalla mira a quien la usa").
8. Cada imagen se mira ampliada ANTES de animarla: manos, caras, objetos que cambian de forma, laptop al revés, texto inventado, logos (la manzana cuenta), carteles en inglés. Lo que falla no entra aunque esté pago.
9. Animar cada imagen como una escena de 8 s con una acción que avanza y cubre 2-3 frases (PLANTILLA E): 9-10 clips para 90 s, nunca un clip por frase.
10. Planos variados (general, medio, primer plano, detalle, sobre el hombro, cenital); nunca dos tomas seguidas con el mismo plano y pose.
11. Pantallas nunca vacías: se piden en verde croma y la pantalla se compone en la edición en el idioma del anuncio, sin temblor (esquinas suavizadas).
12. Cada toma entra en la frase de la voz que la nombra (anclada a los tiempos de Whisper). Al menos 65 % del tiempo es video en movimiento; fotos quietas, 35 % como máximo.

## C. Tomas de TikTok
1. Buscar en el navegador: https://www.tiktok.com/search/video?q=[búsqueda] y juntar los links (a[href*="/video/"]). Buscar por situación y por creadores de un oficio mostrando su día ("un día en mi panadería"), no frases genéricas. Esperar 6-10 s entre búsquedas; si vuelve vacía, TikTok está limitando: reintentar más tarde.
2. Bajar: yt-dlp -q --socket-timeout 15 -f "bv*[height<=1920]+ba/b" --merge-output-format mp4 -o "tomas/candidatas/%(id)s.%(ext)s" [link]. De a 5 en paralelo, con tiempo límite. Si falla, pip install -U yt-dlp; si sigue, bajar el video desde la pestaña abierta.
3. Hoja de contacto: 3 cuadros por video (inicio, medio, final) en una imagen, con el nombre arriba de cada uno, para elegir rápido.
4. Descartar: subtítulos, textos pegados, marcas de agua, logos, caras conocidas, tomas oscuras o borrosas. Nunca tapar un texto con otra cosa: buscar otra toma o recrearla con IA.
5. Detectar cortes escondidos (muchos TikTok son montajes): diferencia entre cuadros consecutivos con opencv; usar solo tramos sin corte.
6. Cortar: ffmpeg -ss [inicio] -t [duración] -i in.mp4 -an -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" -c:v libx264 -crf 18 -pix_fmt yuv420p out.mp4
7. Anotar cada toma en recursos/CREDITOS.md: link, cuenta, tramo y qué muestra.
8. Derechos: cada video es de su creador. Avisarle al usuario antes de usarlo en un anuncio; lo seguro es pedir permiso o usar la toma como referencia y recrearla con IA.

## D. Edición (ffmpeg + Whisper)
1. Normalizar cada clip: 1080x1920 (scale con force_original_aspect_ratio=increase + crop), audio a -18 LUFS por clip.
2. Recortar solo los bordes de cada clip (antes de la primera palabra y después de la última, silencedetect a -40 dB + tiempos de Whisper, 0,08 s de margen). Cortes siempre sobre el silencio real, nunca adentro de una palabra. No acelerar la voz del avatar.
3. Unir recodificando con trim/atrim + concat. Nunca concat con -c copy: el audio se corre en cada unión.
4. Transcribir cada clip con 1,5 s de silencio agregado al final (Whisper se come la última palabra si no). Los TIEMPOS salen de Whisper; el TEXTO, del guion.
5. Subtítulos .ass quemados con el filtro subtitles, Poppins Black, blanco con borde negro, palabra clave en color. Avatar en selfie: de a una palabra grande. B-roll: grupos que duren al menos 1 s. Cada palabra dicha aparece una sola vez en pantalla (subtítulo o texto grande, nunca los dos).
6. Título fijo del cuadro 0 hasta el segundo 3-5, uno o dos renglones, arriba de la cabeza.
7. Algo cambia cada 1,5-3 s (cortes, tomas, palabras, emojis). Sin zoom adentro de una toma ni saltos de plano en la misma toma; un movimiento solo a propósito y con motivo. Nada de efectos de relleno.
8. Emojis o íconos anclados a la palabra que se dice, al costado, nunca sobre la cara ni su recorrido.
9. Música original o con licencia libre para anuncios, debajo de la voz (0,15-0,2) con ducking (sidechaincompress). Anotarla en CREDITOS.md.
10. Cierre: último plano desenfocado y oscurecido, la caja del producto entera, tres etiquetas (garantía, qué incluye, acceso), titular de dos renglones y el texto del botón copiado letra por letra de la landing. Sin precio.
11. Master: loudnorm a -14 LUFS, pico -1 dB. H.264 1080x1920, 10-20 Mbps, AAC.
12. Nada de drawtext de ffmpeg si la PC no tiene fuentes: textos en .ass o en imágenes.

## Zonas (lienzo 1080x1920)
- Lo tapa Instagram: arriba 0-270; abajo desde 1250; a la derecha x > 950 entre y 980 y 1250.
- Gancho, palabra clave, producto y botón entre y 420 y 1250.
- Nada pasa por la cara (y aprox. 450-900 en plano de cintura), tampoco en movimiento. Títulos arriba de la cabeza (y 300-520); subtítulos abajo del mentón.

## E. Control final (sin esto no se entrega)
- Transcribir el MP4 final y compararlo con el guion hasta donde termina la voz (después Whisper inventa sobre la música). Toda diferencia es un error hasta escucharla.
- Sin precio, nada inventado, una sola voz y una sola persona gramatical.
- Hojas de cuadros (uno cada 0,65 s) del gancho y de cada tramo, ampliadas: manos, caras, pantallas, logos, texto inventado, nada en zonas tapadas ni sobre la cara.
- Sin cuadros negros (blackdetect), sin silencios de 1 s o más, sin zoom adentro de una toma.
- ffprobe: 1080x1920, con audio, 10-20 Mbps. Volumen -14 LUFS (±1), pico ≤ -1 dB.
- Lo que se encuentra mal se arregla antes de mostrar, sin preguntar. Lo que no se pudo mirar o escuchar va en la primera línea de la entrega.
- Primer video de la tanda: mostrarlo y esperar el OK antes de hacer el resto.

## Errores conocidos
- Otra voz en cada clip → misma voz de Flow como ingrediente; por API, mismo texto de voz y medir el tono. Si se aparta poco: ffmpeg -i clip.mp4 -af "rubberband=pitch=0.89:formant=preserved" -c:v copy clip_ok.mp4 (ajustar y medir).
- Frase cortada al final → el bloque pasaba 160 caracteres.
- Repite palabras o agrega una cola ("¡Ven ahora!") → cortar en el silencio o regenerar ese bloque.
- Omni escribe en pantalla lo que va entre comillas → describir el gesto sin citar.
- Flow frena el prompt → sacar listas de prohibidos ("no watermark") y escribir en positivo; no nombrar el celular ni el trípode (los dibuja).
- Un dedo levantado hacia la cámara → regenerar con "never raises a single finger toward the camera".
- "Hemos detectado actividad inusual" en Flow → no se cobra; esperar y seguir más tarde.
- Texto en inglés en pantallas o carteles → "screens and papers without readable text" y mirar cada pantalla.
- Toma de TikTok que salta de lugar → era un montaje; usar un tramo sin corte.
- El volumen salta entre tomas → cada clip a -18 LUFS antes de unir.

## PLANTILLA A - foto maestra de la persona
CHARACTER REFERENCE PHOTO - [NAME]
Photorealistic photograph of a real person (not an illustration, not CGI).
FACE (lock every detail):
- [age] years old, [origin/look], [face shape]
- Eyes: [color], [shape], [detail]
- Eyebrows: [thickness, shape, color]
- Nose: [bridge, tip, nostril width]
- Lips: [fullness, shape, natural color]
- Skin: [tone], natural uneven texture, visible pores, [freckles / mole / mark: where]
- Hair: [color], [length], [texture], [style]
- Expression: [confident, slight smile...]
WARDROBE (kept in every scene): [garment, color, fabric, accessories].
FRAMING: 9:16 vertical, medium close-up from mid-chest to just above the head, facing the camera, eyes to the lens.
BACKGROUND: plain soft light-grey studio backdrop.
LIGHTING: soft key light at 45 degrees from the left, gentle fill, subtle rim light; natural shadows on the side of the nose, under the cheekbones and below the lower lip.
CAMERA: full-frame camera, 85 mm portrait lens, f/2.8, razor-sharp focus on the eyes, true-to-life colors.
SKIN: visible pores, fine lines, natural sebum sheen, small imperfections, untouched natural skin.
QUALITY: ultra-detailed, highest resolution, clean frame.

## PLANTILLA B - escena de un bloque (avatar)
IDENTITY REFERENCE: use the attached photo of [NAME] as the exact identity. Same face, same features, same skin, same hair and the same outfit ([outfit]). Keep the person exactly as they are.
SCENE FOR BLOCK [N] - [hook / problem / solution / offer / call]:
[NAME] is in [specific place, time of day, 2-3 objects that tell this block's story].
Pose at the first frame: [pose or gesture that opens this block].
FRAMING: 9:16 vertical, [medium close-up chest to crown | medium shot waist up], eye level, [facing camera | 3/4 side].
LIGHTING: [real light source of the place], natural falloff on the face, soft shadows on the side of the nose and under the cheekbones.
CAMERA: full-frame, 50 mm, f/2.0, shallow depth of field, sharp focus on the eyes.
STYLE: photorealistic, real skin texture with pores, clean frame.

## PLANTILLA C - animar la escena con voz (Omni)
IDENTITY LOCK - READ FIRST:
The person in the attached image is the ONLY subject. Keep the exact same face in every frame; every facial feature stays as in the input image.
Locked features: [paste the FACE sheet].
The FIRST FRAME of the video is the attached image, unchanged.
SKIN & TEXTURE: visible pores, natural sebum sheen, slightly uneven skin tone, fine lines, natural lip texture. Skin looks alive and human.
SCENE: animate the subject inside the environment of the attached image. Keep its background, wardrobe, lighting, color palette and atmosphere exactly as they are.
CAMERA: keep the framing of the attached image. 50 mm equivalent, f/2.0. Very subtle handheld micro-movement. Fixed distance and framing for the whole clip.
ACTION FOR THIS CLIP: [one concrete, natural gesture, described without quoting any words]. Minimal natural head movement (2-3 degrees). Real blink every 4-6 s. Shoulders breathe. Precise lip and jaw sync with every syllable.
LIGHTING: match the light of the attached image. No flat fill.
VOICE - [Flow: use the voice "[VOICE NAME]" (ingredient) | API: the SAME voice in every clip of this series, clip [n] of [total]]: [language and accent], [age and gender], [voice character]. Pace: [fast]. Tone: direct, speaks TO the viewer. Energy: [7-9]/10, controlled. Pitch stays steady. Sentences end with a slight downward, confident intonation. Crisp consonants. Words in CAPITALS get stronger emphasis. Pronunciation: "[BRAND]" = "[how it sounds]".
AUDIO: clean isolated voice only, silent background.
FRAME: clean image, the picture only, with nothing written or overlaid.
SCRIPT - say it EXACTLY as written, word for word, ONCE. Start speaking within the first 0.3 s and finish before second 7.5; after the last word, close the mouth and hold a natural, confident expression until the end:
"[block text, max 160 characters, with 1-2 words in CAPITALS]"

## PLANTILLA D - toma de b-roll con la misma persona y lugar
References: [character sheet of NAME] and [master photo of PLACE].
Another angle of the same scene at the same moment, same photo session: same place, objects, light, color, lens and grain; only the camera and the action change. Do not copy the pose or the framing of the references.
SHOT: [wide | medium | close-up of the face | detail of hands or screen | over the shoulder | top-down], 9:16 vertical.
ACTION: [NAME] [what they do in this phrase], feeling [emotion]. [Time of day].
GEOMETRY: [the laptop seen from the side like an L; the screen faces the person using it] / [phone screen in solid chroma green].
STYLE: photorealistic, natural skin, real light of the place, screens and papers without readable text, clean frame.

## PLANTILLA E - animar una escena de b-roll (8 s)
Animate this exact image as one continuous 8-second shot. Same person, place, light and clothing from the first to the last frame.
ACTION: [one action that moves forward during the 8 s: arrives, opens, reads, reacts]. Natural hands and real physics.
CAMERA: [static tripod shot | slow movement with its reason].
Screens stay solid chroma green. Clean frame, the picture only.

## Cómo entregar
Ruta del MP4, qué formato y ángulo es, el costo real pieza por pieza y, en la primera línea, cuántos errores quedan y lo que no se pudo mirar o escuchar.
