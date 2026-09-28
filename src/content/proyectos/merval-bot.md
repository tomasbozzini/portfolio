---
title: Merval bot
slug: merval-bot
category: Personales
featured: false
emblem: trading
status: Corriendo en Oracle Cloud (paper trading)
summary: >-
  Bot de trading algorítmico con indicadores técnicos, paper trading en Alpaca, alertas por
  mail y una capa de análisis con LLM.
stack:
  - Python
  - yfinance
  - Alpaca
  - Groq
order: 9
---

## Problema

Probar una estrategia de trading con indicadores técnicos sin poner dinero real, y que corra sola todos los días.

## Solución

Bot en Python que baja precios con yfinance y calcula indicadores técnicos (SMA, RSI, MACD). Las órdenes se ejecutan contra Alpaca en modo paper trading, las alertas salen por Gmail y una capa de análisis con un modelo en Groq suma contexto a las señales. Corre en el Free Tier de Oracle Cloud.

<!-- TODO: si querés, contá qué reglas dispara cada indicador y qué aporta el análisis del LLM. -->
