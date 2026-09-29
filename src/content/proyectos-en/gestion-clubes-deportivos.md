---
slug: gestion-clubes-deportivos
title: Management system for sports clubs
summary: >-
  A multi-tenant desktop application to manage court bookings, with each club's data
  isolated in its own schema.
---

## Problem

A single system has to serve several clubs at once, without one club being able to see another's data, and it has to work on several of the club's computers at the same time.

## Solution

A desktop application with a multi-tenant architecture: each client has its own schema in the database, and every table uses RLS (Row Level Security) to guarantee isolation. Passwords are stored hashed with bcrypt.

The system has three roles with different permissions:

- **Superadmin**: manages clients and global settings.
- **Supervisor**: oversees a club's operation.
- **Admin**: handles day-to-day bookings.

So that several PCs at the club work against the same state, the app syncs by polling every 30 seconds.
