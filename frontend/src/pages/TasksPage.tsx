import React, { useState, useEffect, type FormEvent } from 'react';
import api from '../api/axios';
import { type Task, type CreateTaskDto } from '../types/task';
import TaskItem from '../components/TaskItem';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Error al cargar las tareas. Intente de nuevo.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!title.trim()) {
      setFormError('El título de la tarea es obligatorio.');
      return;
    }

    try {
      const newTaskData: CreateTaskDto = { title, description: description || undefined };
      const response = await api.post<Task>('/tasks', newTaskData);
      setTasks([response.data, ...tasks]); 
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setFormError(
        (Array.isArray(err.response?.data?.message) ? err.response?.data?.message[0] : err.response?.data?.message) || 'Error al crear la tarea.',
      );
    }
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Mis Tareas 📝
      </h1>

      {/* Formulario de Creación */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Nueva Tarea</h2>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <input
            type="text"
            placeholder="Título de la tarea (Requerido)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            maxLength={255}
          />
          <textarea
            placeholder="Descripción (Opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {formError && (
            <p className="text-red-500 text-sm mt-1">{formError}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
          >
            Añadir Tarea
          </button>
        </form>
      </div>

      {/* Lista de Tareas */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Listado de Tareas</h2>
        {loading && (
          <div className="text-center p-8 text-indigo-600">Cargando tareas...</div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        {!loading && !error && tasks.length === 0 && (
          <div className="text-center p-10 bg-gray-100 rounded-xl">
            <p className="text-lg text-gray-500">
              🎉 ¡No tienes tareas! Usa el formulario de arriba para crear una.
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;