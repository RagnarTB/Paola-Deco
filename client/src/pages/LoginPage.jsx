// client/src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const { signin, signup, isAuthenticated, errors } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // Si ya está autenticado, mandar al catálogo
    useEffect(() => {
        if (isAuthenticated) navigate("/admin");
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            signin({ email: formData.email, password: formData.password });
        } else {
            signup(formData);
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="font-display bg-[#fdf2f6] min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Decorative Blobs */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-purple-300/30 -top-20 -left-20 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-l from-primary/20 to-orange-200/30 -bottom-32 -right-32 rounded-full blur-3xl opacity-60"></div>

            <main className="relative z-10 w-full max-w-[480px] px-4">
                <div className="bg-white/75 backdrop-blur-xl border border-white/80 shadow-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-sm border border-primary/20">
                            <span className="material-symbols-outlined text-3xl">celebration</span>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-gray-900 text-2xl font-bold tracking-tight">
                                Paola Deco & Eventos
                            </h1>
                            <p className="text-gray-500 text-sm font-medium">
                                {isLogin ? 'Panel Administrativo' : 'Registrar Administrador'}
                            </p>
                        </div>
                    </div>

                    {/* Errores */}
                    {errors.map((error, i) => (
                        <div
                            key={i}
                            className="bg-red-500 p-2 text-white text-center rounded-md text-sm"
                        >
                            {error}
                        </div>
                    ))}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-gray-900 text-sm font-bold ml-2">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Tu nombre"
                                    onChange={handleChange}
                                    className="w-full h-12 px-4 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-gray-900 text-sm font-bold ml-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@paoladeco.com"
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-900 text-sm font-bold ml-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••"
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"   // <-- LA LÍNEA CLAVE
                                className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-[#ff4d88] hover:to-primary text-white font-bold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isLogin ? 'Ingresar' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    {/* Toggle Login/Register */}
                    <div className="text-center mt-2">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-medium text-gray-400 hover:text-primary transition-colors"
                        >
                            {isLogin
                                ? '¿Primera vez? Crea una cuenta aquí'
                                : '¿Ya tienes cuenta? Inicia Sesión'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
