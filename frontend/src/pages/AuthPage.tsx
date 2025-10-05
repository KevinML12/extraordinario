import React, { useState, type FormEvent } from 'react'; // Corregido FormEvent
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  type: 'login' | 'register';
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const isLogin = type === 'login';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', { email, password });
        login(response.data.accessToken);
        navigate('/tasks', { replace: true });
      } else {
        // --- LÓGICA DE REGISTRO: Más limpia ---
        await api.post('/auth/register', { email, password });
        
        alert('✅ ¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.'); 
        
        // Redirección sin query params innecesarios
        navigate('/login', { replace: true }); 
        // --- FIN DE LÓGICA DE REGISTRO ---
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        (isLogin ? 'Login failed' : 'Registration failed');
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        
        {/* Eliminado el bloque de mensaje de éxito, ahora se usa un alert simple */}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading
              ? 'Procesando...'
              : isLogin
              ? 'Iniciar Sesión'
              : 'Registrarme'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <Link
            to={isLogin ? '/register' : '/login'}
            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;