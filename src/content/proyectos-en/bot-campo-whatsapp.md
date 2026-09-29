---
slug: bot-campo-whatsapp
title: WhatsApp farm log bot
status: MVP in development
summary: >-
  A digital farm logbook: the farmer writes on WhatsApp in plain language and an LLM turns
  the message into a structured record in the database.
---

## Problem

A farmer needs to record what happens on the farm without filling in forms: writing the way they speak, from the phone they already use every day.

## Solution

The farmer sends an ordinary text message on WhatsApp. The WhatsApp Cloud API receives it, Make orchestrates the flow, a LLaMA 3.3 70B model on Groq interprets the free text and returns JSON, which is parsed and stored as a structured record in PostgreSQL (Neon). The focus is on animal health.

```
WhatsApp Cloud API → Make → Groq (LLaMA 3.3 70B) → Parse JSON → Neon (PostgreSQL)
```

### Status

The text flow works end to end. Still to come: the audio branch, with transcription, and a confirmation reply to the farmer on WhatsApp.
