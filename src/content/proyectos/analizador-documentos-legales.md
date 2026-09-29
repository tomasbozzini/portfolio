---
title: Analizador de documentos legales con IA
slug: analizador-documentos-legales
category: IA y automatización
featured: true
emblem: legal
summary: Aplicación que analiza documentos legales con un modelo de lenguaje.
stack:
  - Python
  - Streamlit
  - Groq / LLaMA
  - PyMuPDF
links:
  repo: https://github.com/tomasbozzini/analizador-legal
order: 1
# TODO: completar el estado real del proyecto y descomentar esta línea.
# status: En desarrollo
---

## Problema

<!-- TODO: contá en dos o tres oraciones qué problema concreto resuelve. ¿Quién tenía que leer esos documentos, cuánto tiempo le llevaba, qué buscaba encontrar? -->

## Solución

Una aplicación en Streamlit donde se sube el documento. La lectura y extracción del PDF la hace PyMuPDF, y el análisis lo resuelve un modelo LLaMA a través de la API de Groq.

<!-- TODO: agregar qué devuelve el análisis (resumen, cláusulas detectadas, respuestas a preguntas) y qué tipo de documentos soporta. -->
