import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/tasks" className="text-2xl font-bold text-indigo-600">
          Task App
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:inline">
            Hola, {user?.email}
          </span>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;