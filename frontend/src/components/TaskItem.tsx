import React, { useState } from 'react';
import { type Task, type UpdateTaskDto } from '../types/task'; // Usamos 'type' para Task y UpdateTaskDto
import api from '../api/axios';

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description || '');

  // Maneja el toggle (✅ / 🔄)
  const handleToggleDone = async () => {
    try {
      const response = await api.patch(`/tasks/${task.id}`, {
        done: !task.done,
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Error al actualizar el estado de la tarea.');
    }
  };

  // Maneja la edición de texto
  const handleSave = async () => {
    if (newTitle.trim() === '') {
      alert('El título no puede estar vacío.');
      return;
    }

    const updateData: UpdateTaskDto = {};

    if (newTitle !== task.title) {
        updateData.title = newTitle.trim();
    }
    if (newDescription !== (task.description || '')) {
        updateData.description = newDescription.trim() || undefined; // Envía undefined si está vacío
    }

    // Solo si hay algo que actualizar (además del estado 'done')
    if (Object.keys(updateData).length > 0) {
        try {
            const response = await api.patch(`/tasks/${task.id}`, updateData);
            onUpdate(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving task details:', error);
            alert('Error al guardar los detalles de la tarea.');
        }
    } else {
        setIsEditing(false); // No hubo cambios de texto, solo cerrar edición
    }
  };

  // Maneja la eliminación
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await api.delete(`/tasks/${task.id}`);
        onDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error al eliminar la tarea.');
      }
    }
  };

  // --- RENDERING ---
  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-md flex flex-col transition-colors ${
        task.done ? 'bg-green-100 border-l-4 border-green-500' : 'bg-white'
      }`}
    >
      {isEditing ? (
        // Estado de Edición
        <div className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-lg font-semibold"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
            placeholder="Descripción opcional"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      ) : (
        // Estado Normal de Visualización
        <div 
          className="flex-1 overflow-hidden cursor-pointer"
          onClick={() => setIsEditing(true)} // Clic para empezar a editar
        >
          <h3
            className={`text-lg font-semibold ${
              task.done ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
      )}

      <div className="flex justify-end items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Guardar
          </button>
        )}
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setNewTitle(task.title);
              setNewDescription(task.description || '');
            }}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        )}
        
        {/* Botones de acción siempre visibles */}
        <button
          onClick={handleToggleDone}
          className={`p-2 rounded-full transition-colors w-10 h-10 flex items-center justify-center`}
          title={task.done ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        >
          {task.done ? '🔄' : '✅'}
        </button>

        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors w-10 h-10 flex items-center justify-center"
          title="Eliminar Tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;