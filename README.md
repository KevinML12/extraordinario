# 🚀 Full-Stack Task App: Gestión de Tareas (NestJS & React)

Este proyecto es una aplicación Full-Stack completa que implementa autenticación JWT y un CRUD (Create, Read, Update, Delete) de tareas.

- **Backend:** NestJS (TypeScript) + TypeORM + PostgreSQL.
- **Frontend:** React (TypeScript) + Vite + Tailwind CSS.

## 🛠️ Requisitos Previos

Asegúrate de tener instalado y configurado lo siguiente:

1.  **Node.js y npm:** (Versión 18+ recomendada).
2.  **Docker & Docker Compose:** Necesario para levantar la base de datos PostgreSQL.
3.  **Nest CLI (Global):**
    ```bash
    npm install -g @nestjs/cli
    ```

---

## 🐳 Guía de Instalación y Entorno

Sigue estos pasos para levantar toda la infraestructura y las aplicaciones.

### 1. Variables de Entorno

Crea el archivo `.env` en la carpeta **`backend/`** basándote en `.env.example`. Las credenciales deben coincidir con la configuración del contenedor Docker.

### 2. Base de Datos (PostgreSQL con Docker Compose)

Ejecuta este comando **desde la raíz** del proyecto (`fullstack-task-app/`) para iniciar el servicio de PostgreSQL.

```bash
docker compose up -d

El servicio estará disponible en localhost:5432.

### 3. Configuración e Inicio del Backend
Bash

# Navega a la carpeta /backend
cd backend

# A. Instalar dependencias
npm install

# B. Ejecutar Migraciones (Crea las tablas 'users' y 'tasks')
npm run migration:run

# C. Iniciar el servidor de NestJS
npm run start:dev
# Servidor disponible en: http://localhost:3000
### 4. Configuración e Inicio del Frontend
Abre una nueva terminal o pestaña.

Bash

# Navega a la carpeta /frontend
cd frontend

# A. Instalar dependencias
npm install

# B. Iniciar la aplicación React
npm run dev
# Cliente disponible en: http://localhost:5173
Una vez que ambos servidores estén activos, abre el navegador en http://localhost:5173 para comenzar a usar la aplicación (Registro > Login > CRUD).


---
---
