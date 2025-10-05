// ARCHIVO: frontend/src/types/task.ts

export interface Task { // <--- CLAVE: El export debe estar aquí
  id: number;
  title: string;
  description?: string;
  done: boolean;
  userId: number;
}

export interface CreateTaskDto { // <--- CLAVE
  title: string;
  description?: string;
}

export interface UpdateTaskDto { // <--- CLAVE
  title?: string;
  description?: string;
  done?: boolean;
}