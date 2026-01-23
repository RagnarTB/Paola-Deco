// client/src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const { signin, isAuthenticated, errors } = useAuth(); // SOLO signin
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Si ya está autenticado, ir directo al admin
    useEffect(() => {
        if (isAuthenticated) navigate("/admin");
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        signin({ email, password });
    };

    return (
        <div className="font-display bg-[#fdf2f6] min-h-screen flex items-center justify-center relative overflow-hidden">

            {/* Decoración suave */}
            <div className="absolute w-[500px] h-[500px] bg-primary/20 -top-20 -left-20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute w-[600px] h-[600px] bg-pink-300/20 -bottom-32 -right-32 rounded-full blur-3xl opacity-50"></div>

            <main className="relative z-10 w-full max-w-md px-4">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl flex flex-col gap-6">

                    {/* Header */}
                    <div className="text-center">
                        <span className="material-symbols-outlined text-4xl text-primary mb-2">
                            lock
                        </span>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Acceso Restringido
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Solo personal autorizado
                        </p>
                    </div>

                    {/* Errores */}
                    {errors.map((error, i) => (
                        <div
                            key={i}
                            className="bg-red-500 p-2 text-white text-center rounded-lg text-sm font-bold"
                        >
                            {error}
                        </div>
                    ))}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="email"
                            placeholder="admin@paoladeco.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="h-12 px-4 rounded-xl border focus:border-primary outline-none"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="h-12 px-4 rounded-xl border focus:border-primary outline-none"
                            required
                        />

                        <button
                            type="submit"
                            className="h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg mt-2 transition-all"
                        >
                            Ingresar
                        </button>

                    </form>

                </div>
            </main>
        </div>
    );
}
