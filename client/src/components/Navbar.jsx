// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">celebration</span>
                        </div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">Paola<span className="text-primary">Deco</span></span>
                    </Link>

                    {/* Menú Escritorio */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Inicio</Link>
                        <Link to="/catalogo" className="text-gray-600 hover:text-primary font-medium transition-colors">Catálogo</Link>

                        {isAuthenticated ? (
                            <Link to="/admin" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                                Panel Admin ({user?.username})
                            </Link>
                        ) : (
                            <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[18px]">lock</span>
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Botón Menú Móvil (Solo visual por ahora) */}
                    <button className="md:hidden text-gray-600 text-2xl">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}