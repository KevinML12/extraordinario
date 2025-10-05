```markdown
# ⚙️ Backend: NestJS - Task API

Este módulo implementa la lógica de negocio, la persistencia de datos y la seguridad mediante JWT.

## 🏛️ Arquitectura

La arquitectura sigue el patrón modular de NestJS, con enfoque en la separación de responsabilidades:

- **`AuthModule`:** Maneja las rutas públicas de `/auth/register` y `/auth/login`. Utiliza `bcrypt` para el hashing de contraseñas y `Passport/JWT` para generar y validar tokens de acceso.
- **`TasksModule`:** Implementa el CRUD completo para la entidad `Task`. Todas las rutas (`/tasks`) están protegidas con el **`JwtAuthGuard`**.
- **TypeORM:** Utilizado como ORM para la interacción con PostgreSQL.
    - **Entidades:** `User` y `Task` con relación `OneToMany`.
    - **data-source.ts:** Archivo de configuración para las migraciones.

## 🔒 Seguridad y Validaciones

- **Autenticación JWT:** El token de acceso se genera al hacer login y se requiere en el header `Authorization: Bearer <token>` para acceder a las rutas de `/tasks`.
- **Protección de Recursos:** Todos los servicios de tareas (`TasksService`) utilizan el `userId` extraído del JWT para garantizar que el usuario solo manipule *sus propias* tareas (autorización a nivel de recurso).
- **DTOs y Validación:** Se utiliza `class-validator` con un `ValidationPipe` global para asegurar que todos los datos entrantes (registro, login, creación/actualización de tareas) cumplen con las reglas definidas antes de llegar al servicio.

## 📦 Scripts de Desarrollo

Ejecuta estos comandos desde la carpeta `backend/`.

| Script | Descripción |
| :--- | :--- |
| `npm run start:dev` | Inicia el servidor en modo *watch* (reinicia al guardar). |
| `npm run migration:run` | Ejecuta las migraciones pendientes (crea/actualiza tablas). |
| `npm run migration:revert` | Revierte la última migración (útil para desarrollo/limpieza). |
| `POST /auth/register` | Ruta pública para la creación de usuarios. |
| `POST /auth/login` | Ruta pública para obtener el JWT. |
| `GET /tasks` | Ruta protegida para obtener todas las tareas del usuario. |