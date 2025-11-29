import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validación básica
    if (!formData.correo || !formData.password) {
      setError('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setError('Por favor, ingresa un correo electrónico válido');
      setIsLoading(false);
      return;
    }

    try {
      // Llamada a la API
      const response = await axios.post('http://127.0.0.1:8000/api/users/login', {
        correo: formData.correo,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Si la respuesta es exitosa
      if (response.data) {
        // Guardar datos del usuario y token en localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Si hay token, guardarlo también
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Redirigir al dashboard
        navigate('/tickets');
      }
    } catch (err) {
      // Manejo de errores
      if (err.response) {
        // Error de respuesta del servidor
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;

        switch (status) {
          case 400:
            setError(message || 'Datos de inicio de sesión inválidos');
            break;
          case 401:
            setError('Correo o contraseña incorrectos');
            break;
          case 404:
            setError('Usuario no encontrado');
            break;
          case 500:
            setError('Error del servidor. Intenta más tarde');
            break;
          default:
            setError(message || 'Error al iniciar sesión');
        }
      } else if (err.request) {
        // Error de red
        setError('No se pudo conectar con el servidor. Verifica tu conexión');
      } else {
        // Otro tipo de error
        setError('Error inesperado. Intenta nuevamente');
      }
      console.error('Error de login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#101922] flex items-center justify-center p-8 md:p-12 overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo Section */}
        <div className="mb-6 flex flex-col items-center space-y-4">
          <div className="animate-subtle-bob">
            <svg fill="none" height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-gradient" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E90FF"></stop>
                  <stop offset="1" stopColor="#137fec"></stop>
                </linearGradient>
                <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur>
                  <feOffset dx="2" dy="4"></feOffset>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"></feFuncA>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#drop-shadow)">
                <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="url(#logo-gradient)"></path>
                <path d="M35 70L15 50L35 30" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M65 30L85 50L65 70" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M56.6667 80L43.3333 20" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8"></path>
              </g>
              <circle className="animate-sparkle" cx="93" cy="25" r="3" fill="white" style={{ animationDelay: '0s' }}></circle>
              <circle className="animate-sparkle" cx="7" cy="75" r="2" fill="white" style={{ animationDelay: '0.5s' }}></circle>
              <circle className="animate-sparkle" cx="93" cy="75" r="2" fill="white" style={{ animationDelay: '1s' }}></circle>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">DevTrack Studio</h1>
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-bold text-white text-center px-4 pb-2 tracking-tight">
          Iniciar Sesión
        </h1>
        <p className="text-base text-slate-300 text-center px-4 pb-8">
          Bienvenido de nuevo a tu asistente de IA.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="mx-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="px-4">
            <label htmlFor="correo" className="block text-base font-medium text-white pb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="w-full h-14 px-4 text-base text-white bg-slate-800 border border-slate-700 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                       placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all"
              placeholder="Ingresa tu correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="px-4">
            <label htmlFor="password" className="block text-base font-medium text-white pb-2">
              Contraseña
            </label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="flex-1 h-14 px-4 text-base text-white bg-slate-800 border border-slate-700 
                         rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-primary/50 
                         focus:border-primary placeholder:text-slate-500 disabled:opacity-60 
                         disabled:cursor-not-allowed transition-all"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePassword}
                disabled={isLoading}
                className="flex items-center justify-center px-4 bg-slate-800 border border-slate-700 
                         border-l-0 rounded-r-lg text-slate-500 hover:text-slate-300 
                         disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-4 pt-8 pb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 px-5 bg-primary text-white font-bold text-base rounded-lg
                       hover:bg-primary/90 active:bg-primary/80 disabled:opacity-60 
                       disabled:cursor-not-allowed transition-all duration-200
                       hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
                       active:translate-y-0"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          {/* Footer Link */}
          <div className="px-4 text-center">
            <a href="#" className="text-primary font-medium text-base hover:underline transition-all">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;