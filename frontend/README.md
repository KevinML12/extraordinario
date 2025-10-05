# 🖥️ Frontend: React - Task Client

Este módulo implementa la interfaz de usuario, la gestión del estado de autenticación y el consumo de la API REST de NestJS.

## ✨ Tecnologías

- **React / TypeScript** con el *bundler* **Vite**.
- **Tailwind CSS:** Utilizado para un diseño limpio, moderno y responsivo.
- **`react-router-dom`:** Manejo de rutas y protección de acceso.
- **`axios`:** Cliente HTTP configurado con un **Interceptor** para inyectar automáticamente el token JWT en las cabeceras de todas las solicitudes protegidas.
- **`jwt-decode`:** Utilizado para extraer la información del usuario (email, id) del token JWT.

## 🧭 Flujo de Rutas y Navegación

El cliente define dos grupos principales de rutas:

1.  **Rutas Públicas:**
    - `/login`
    - `/register`
2.  **Rutas Protegidas:**
    - `/tasks`
    - `/` (Redirige a `/tasks`)

### Protección de Rutas

La aplicación utiliza un componente **`ProtectedRoute`** que:
1.  Verifica la propiedad `isAuthenticated` del `AuthContext`.
2.  Si es `false` (no hay token válido), redirige inmediatamente a `/login`.
3.  Si es `true`, permite el acceso al componente `TasksPage` y muestra la `Navbar`.

## 🔄 Funcionalidad de la Tarea (CRUD UI)

El componente `TasksPage.tsx` maneja la presentación de datos, los estados de carga/error y el envío de peticiones:

- **Crear Tarea:** Formulario superior que envía `POST /tasks`.
- **Modificar Estado:** El componente `TaskItem` envía `PATCH /tasks/:id` para alternar el campo `done`.
- **Modificar Detalle (Nuevo):** Al hacer clic en el texto de la tarea, esta entra en modo de edición y permite enviar un `PATCH` con nuevos valores para el título y la descripción.
- **Eliminar:** El botón de la papelera envía `DELETE /tasks/:id`.

## 📦 Scripts de Desarrollo

Ejecuta este comando desde la carpeta `frontend/`.

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia la aplicación en `http://localhost:5173`. |