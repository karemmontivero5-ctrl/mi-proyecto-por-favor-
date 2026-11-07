---
id: plantilla-carpeta-software
tipo: plantilla
estado: vigente
---

# Plantilla — Carpeta de software

Cada software nuevo tiene su carpeta en `11 - Software construido/<Software>/`, creada el mismo
día, con estos archivos. Siempre los mismos, para saber dónde mirar sin preguntar.

```
11 - Software construido/
└── <Software>/
    ├── Índice.md        qué es, estado y dónde vive el código de verdad
    ├── checklist.md     lo que falta, en orden; lo hecho tachado
    ├── bitacora.md      lo que se hizo, por fecha
    ├── notas.md         decisiones y detalle técnico
    ├── CLAUDE.md        reglas de este software para Claude
    ├── AGENTS.md        las mismas reglas, para otros agentes
    ├── memoria/         espejo de las memorias de Claude Code de este proyecto
    └── <el código>      o su espejo, sin node_modules, .git, builds ni secretos
```

## Índice.md

```
---
id: <software>
tipo: software
actualizado: AAAA-MM-DD
estado: en construcción | funcionando | pausado | archivado
---

# <Software>

**Qué hace:** una o dos líneas.
**Estado:** …
**Dónde vive el código de verdad:** `<ruta real>` (si está fuera de la bóveda, acá queda el espejo)
**Cómo se usa:** el comando o el doble clic para abrirlo.

- [[checklist]] · [[bitacora]] · [[notas]]
```

## checklist.md

```
# Checklist — <Software>

- [ ] primer paso que falta
- [ ] segundo paso
- [x] ~~algo ya hecho~~ — AAAA-MM-DD, resultado
```

## bitacora.md

```
# Bitácora — <Software>

## AAAA-MM-DD
- Qué se hizo y qué quedó.
```

## notas.md

```
# Notas — <Software>

## Decisiones
- AAAA-MM-DD · Qué se decidió y por qué.

## Detalle técnico
- Dependencias, configuración, cosas que no son obvias.
```

## CLAUDE.md y AGENTS.md

```
# <Software> — reglas para el agente

- Qué es y dónde está el código.
- Cómo se corre y cómo se prueba.
- Qué no hay que tocar.
- Al terminar: bitácora, checklist y espejo del código en la bóveda.
```

Al crear la carpeta, sumar su fila en
[[11 - Software construido/Índice del software construido|el índice del software]].
