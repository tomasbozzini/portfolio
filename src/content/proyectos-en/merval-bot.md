---
slug: merval-bot
title: Merval bot
status: Running on Oracle Cloud (paper trading)
summary: >-
  An algorithmic trading bot with technical indicators, paper trading on Alpaca, email
  alerts and an LLM analysis layer.
---

## Problem

Testing a trading strategy based on technical indicators without risking real money, and having it run on its own every day.

## Solution

A Python bot that pulls prices with yfinance and computes technical indicators (SMA, RSI, MACD). Orders are placed against Alpaca in paper trading mode, alerts go out through Gmail, and an analysis layer with a model on Groq adds context to the signals. It runs on the Oracle Cloud Free Tier.
