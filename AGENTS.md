# CLAUDE.md — Mi segundo cerebro

## Qué es esta carpeta

Es mi segundo cerebro: una bóveda de Obsidian con todo lo de mi trabajo, mis proyectos y lo que voy
aprendiendo. **Es la única carpeta donde vive mi conocimiento.** Vos (Claude) la leés y la escribís;
yo la miro y la navego en Obsidian.

Las reglas que valen en cualquier carpeta de la compu están en mi `CLAUDE.md` global
(`~/.claude/CLAUDE.md`). Estas son las de adentro de la bóveda.

## Regla 0: leer el contexto maestro antes de trabajar

Antes de hacer cualquier cosa, leé `00 - Inicio/Contexto maestro.md`. Es una nota corta con quién
soy, qué hago, cómo trabajo, cómo hablarme y dónde está cada cosa. Si la tarea es de un proyecto,
después leé su `Índice.md` y su `checklist.md`. No leas media bóveda para arrancar: desde el
contexto maestro se navega al detalle solo si hace falta.

Si el trabajo de la sesión cambia algo de ese contexto (un número, un proyecto nuevo, una forma de
trabajar que te corregí), actualizá el contexto maestro en el mismo turno.

## Regla 1: todo en una sola carpeta, cada cosa en su rama

- Todo lo mío vive acá adentro, en su **rama numerada** (`00 - Inicio`, `01 - Identidad`, …).
  Nada suelto en la raíz de la bóveda, ni en el Escritorio, ni en otra carpeta de la compu.
- Cada rama tiene su nota índice `Índice de <rama>.md`, que enlaza cada nota de esa carpeta.
  Nota nueva = su línea en el índice de su rama.
- **Rama nueva** = carpeta numerada nueva + su índice + su fila en `00 - Inicio/Índice general.md`
  y en el contexto maestro. Nunca una carpeta sin número.
- Lo viejo, vacío o duplicado **no se borra**: va a `90 - Archivo/` con la fecha en el nombre.
- Antes de crear una nota, buscá si ya existe una que cubra el tema. Si existe, se actualiza esa.

## Regla 2: cada software, su carpeta

Todo software o código que armemos vive en `11 - Software construido/<Software>/`, y adentro está
**todo** lo de ese software, siempre con los mismos archivos:

| Archivo | Qué es |
|---|---|
| `Índice.md` | Qué es, en qué estado está y **dónde vive el código de verdad** |
| `checklist.md` | Lo que falta, en orden; lo hecho queda tachado |
| `bitacora.md` | Todo lo que se hizo, por fecha |
| `notas.md` | Decisiones y detalle técnico |
| `CLAUDE.md` | Las reglas de ese software para Claude |
| `AGENTS.md` | Las mismas reglas, para otros agentes (Codex, ChatGPT) |
| `memoria/` | Espejo de las memorias de Claude Code de ese proyecto |
| el código | El código fuente, o su espejo si corre fuera de la bóveda |

- Software nuevo = carpeta nueva el mismo día, con esos archivos, y su fila en
  `11 - Software construido/Índice del software construido.md`. El molde está en
  `99 - Plantillas/Plantilla - Carpeta de software.md`.
- Si el código corre fuera de la bóveda, el `Índice.md` dice la ruta real y acá queda el espejo.
- Lo que no es software no va ahí: los proyectos de contenido, clases o lanzamientos van en
  `07 - Proyectos activos/<Proyecto>/`, cada uno con su `Índice.md` y su `checklist.md`.

## Regla 3: bitácora RAW después de cada orden

Después de cada orden real mía (algo que implicó hacer, decidir, corregir o aprender; no una
pregunta suelta), agregá en ese mismo turno una entrada al final de `RAW/Claude contexto.md`:

- Título: `## AAAA-MM-DD (n) · [Proyecto] Título corto`
- 2 a 5 viñetas: qué pedí, qué se hizo o decidió, qué aprendimos y qué quedó pendiente.
- En silencio: no me preguntes ni me expliques que lo hiciste. Yo cierro los chats sin avisar.

## Regla 4: lo crudo sube a conocimiento

RAW es el primer paso, no el último. Al cerrar cada tanda, lo que va a servir dentro de un mes
tiene que existir **fuera** de RAW:

| Lo que apareció | A dónde va |
|---|---|
| Algo que falta hacer | `00 - Inicio/Tareas.md`, numerado en su sección |
| Algo que se terminó | Se tacha en `Tareas.md` (incluso si no funcionó) |
| Una corrección o preferencia mía | La nota que corresponda de `01 - Identidad/` |
| Una decisión con su porqué | Una nota en `09 - Decisiones y experimentos/` |
| Un número del negocio | La nota del área que corresponda |
| Un procedimiento que se repite | Un SOP en `08 - Procesos y SOP/` |

El paso a paso está en `08 - Procesos y SOP/SOP - Destilar RAW al conocimiento.md`.
Regla corta: **si sirve dentro de un mes, tiene que existir fuera de RAW.**

## Regla 5: notas conectadas

- Cada nota enlaza con `[[ ]]` a las notas relacionadas y está enlazada desde el índice de su rama.
  Ninguna nota queda huérfana.
- Cada nota arranca con su frontmatter (`id`, `tipo`, `actualizado`, `estado`), como en
  `99 - Plantillas/Plantilla - Nota.md`.
- Nombres de archivo claros y en castellano, sin `/`, `:`, `?` ni `#`.
- En las notas, las rutas se escriben con `/`.

## Regla 6: tareas y checklists

- `00 - Inicio/Tareas.md` es el tablero general: tareas numeradas por sección.
- Cada proyecto tiene su `checklist.md`: una lista `- [ ] tarea` en orden.
- Lo terminado se tacha en el lugar (`- [x] ~~tarea~~`). No se borra ni se mueve: queda el registro.
- Cuando te pida "las tareas", pasámelas sección por sección, numeradas.

## Regla 7: fechas absolutas

"Mañana", "el viernes" o "la semana que viene" se guardan como fecha real (`AAAA-MM-DD`),
resuelta contra el día de hoy. Una nota leída dentro de un mes no sabe qué era "mañana".

## Regla 8: nada de secretos

Nunca guardes en la bóveda contraseñas, tokens, claves de API, archivos `.env` ni datos de
tarjetas. Si una nota necesita un acceso, dice **dónde** está guardado, no cuál es.

## Regla 9: respaldo en GitHub

La bóveda es un repositorio git privado. Al cerrar cada tanda de trabajo: `git add` solo de los
archivos que tocaste, `git commit` con un mensaje claro y `git push`. Sin commits vacíos. Nunca
hagas el repo público.

## Cómo hablarme

Está en el contexto maestro, sección «Cómo hablarme y entregarme».
