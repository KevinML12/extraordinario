import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <Navbar />
      <main className="p-4 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;