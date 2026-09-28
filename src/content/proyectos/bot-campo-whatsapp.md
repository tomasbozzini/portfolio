---
title: Bot de campo por WhatsApp
slug: bot-campo-whatsapp
category: IA y automatización
featured: true
emblem: agro-chat
status: MVP en desarrollo
summary: >-
  Cuaderno de campo digital: el productor escribe por WhatsApp en lenguaje natural y un LLM
  convierte el mensaje en un registro estructurado en la base de datos.
stack:
  - WhatsApp Cloud API
  - Make
  - Groq
  - PostgreSQL (Neon)
order: 3
---

## Problema

Un productor agropecuario necesita registrar lo que pasa en el campo sin cargar formularios: escribiendo como habla, desde el teléfono que ya usa todos los días.

<!-- TODO: si querés, agregá cómo se llevaban estos registros antes. -->

## Solución

El productor manda un mensaje de texto común por WhatsApp. El flujo lo recibe la WhatsApp Cloud API, Make lo orquesta, un modelo LLaMA 3.3 de 70B en Groq interpreta el texto libre y devuelve JSON, que se parsea y se guarda como registro estructurado en PostgreSQL (Neon). El foco está puesto en sanidad animal.

```
WhatsApp Cloud API → Make → Groq (LLaMA 3.3 70B) → Parse JSON → Neon (PostgreSQL)
```

### Estado

El flujo de texto funciona de punta a punta. Falta la rama de audio, con transcripción, y la respuesta de confirmación al productor por WhatsApp.
