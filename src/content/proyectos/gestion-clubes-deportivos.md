---
title: Sistema de gestión para clubes deportivos
slug: gestion-clubes-deportivos
category: Sistemas
featured: true
emblem: sports
summary: >-
  Aplicación de escritorio multi-tenant para gestionar reservas de canchas, con los datos
  de cada club aislados en su propio esquema.
stack:
  - Python
  - CustomTkinter
  - SQLAlchemy
  - Supabase (PostgreSQL)
  - bcrypt
order: 2
# TODO: completar el estado real de uso y descomentar esta línea.
# status: En producción
---

## Problema

Un mismo sistema tiene que servir a varios clubes a la vez, sin que los datos de uno puedan verse desde otro, y funcionando en varias computadoras del club al mismo tiempo.

<!-- TODO: si querés, agregá cómo se manejaban las reservas antes del sistema. -->

## Solución

Aplicación de escritorio con arquitectura multi-tenant: cada cliente tiene su propio esquema en la base, y todas las tablas usan RLS (Row Level Security) para garantizar el aislamiento. Las contraseñas se guardan hasheadas con bcrypt.

El sistema maneja tres roles con permisos distintos:

- **Superadmin**: administra los clientes y la configuración global.
- **Supervisor**: control sobre la operación de un club.
- **Admin**: la operación diaria de reservas.

Para que varias PCs del club trabajen contra el mismo estado, hay sincronización por polling cada 30 segundos.
