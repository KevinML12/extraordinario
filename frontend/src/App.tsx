import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas de Autenticación */}
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/register" element={<AuthPage type="register" />} />

          {/* Ruta Protegida: Incluye Navbar y Layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            {/* Ruta raíz redirige a tasks si está autenticado */}
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Route>

          {/* Ruta Catch-all: Si no se encuentra, redirige al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;