---
id: sop-destilar-raw
tipo: sop
actualizado: 2026-11-07
estado: vigente
---

# SOP — Destilar RAW al conocimiento

Cómo lo que se trabaja en los chats deja de ser una anotación suelta y se convierte en conocimiento
que el segundo cerebro usa solo.

## El circuito

```
CAPTURA (cada orden, automática)        DESTILACIÓN (al cerrar cada tanda)
chat / llamada / idea                   RAW
        ↓                                 ↓
       RAW  ───────────────────────→  tareas · decisiones · identidad · SOP · notas
```

La captura es automática: después de cada orden, Claude anota en [[RAW/Claude contexto|RAW]].
La destilación es este SOP. Si solo hay captura, el cerebro guarda pero no aprende.

## Paso 1 — Leer lo nuevo de RAW

Leer las entradas desde el último corte (la fecha está en el registro de abajo). Sumar también lo
que haya en `10 - Fuentes e inbox/` sin marcar como procesado.

## Paso 2 — Clasificar cada entrada

| Lo que aparece | A dónde va | Cómo se reconoce |
|---|---|---|
| Algo que falta hacer | [[00 - Inicio/Tareas\|Tareas]], en su sección y numerado | "Pendiente", "falta", "⚠️ confirmar" |
| Algo que se terminó | Se tacha en [[00 - Inicio/Tareas\|Tareas]] y en el checklist del proyecto | "Hecho", "subido", "verificado" |
| Una corrección o preferencia | La nota que corresponda de `01 - Identidad/` | "Me corrigió", "regla nueva", "prefiero" |
| Una decisión con su porqué | Nota nueva en `09 - Decisiones y experimentos/` | "Se decidió", "se descartó" |
| Un número del negocio | La nota del área (ventas, productos, finanzas) | Precios, ventas, costos, conversión |
| Un procedimiento que se repite | Un SOP nuevo en `08 - Procesos y SOP/` | "El proceso es", pasos |
| Algo de un cliente | Su ficha en `02 - Clientes/` (en RAW, solo una línea) | Nombres, llamadas, acuerdos |

## Paso 3 — Escribir y conectar

- Antes de crear una nota, buscar si ya existe. Si existe, se actualiza esa.
- Cada nota nueva entra al índice de su rama y enlaza con `[[ ]]` a las relacionadas.
- Si cambió algo del contexto general, actualizar el [[00 - Inicio/Contexto maestro|Contexto maestro]].

## Paso 4 — Cerrar

- Anotar la fecha del corte en el registro de abajo.
- Commit + push de la bóveda, solo con los archivos tocados.

## Una vez por semana: mantenimiento

1. Enlaces rotos: notas que apuntan a algo que no existe.
2. Notas huérfanas: notas que no están en ningún índice.
3. Carpetas de software incompletas: les falta alguno de los archivos del molde.
4. Tareas viejas: abiertas hace más de un mes, ¿siguen o se archivan?
5. Lo vacío, viejo o duplicado va a `90 - Archivo/`. No se borra.

## Registro de cortes

| Fecha | Hasta qué entrada | Qué salió |
|---|---|---|
