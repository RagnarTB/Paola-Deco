import { useState } from 'react'; // <--- IMPORTANTE: Importar useState
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // <--- Estado para abrir/cerrar

    // Función para cerrar el menú al hacer click en un enlace
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">celebration</span>
                        </div>
                        <span className="font-bold text-xl text-gray-800 tracking-tight">Paola<span className="text-primary">Deco</span></span>
                    </Link>

                    {/* Menú Escritorio (Desktop) - Se oculta en móvil */}
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

                    {/* Botón Menú Móvil (Hamburguesa) */}
                    <button
                        className="md:hidden text-gray-600 text-3xl p-2 rounded hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)} // <--- Cambia el estado
                    >
                        <span className="material-symbols-outlined">
                            {isMenuOpen ? 'close' : 'menu'} {/* Cambia icono X o Menu */}
                        </span>
                    </button>
                </div>
            </div>

            {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
            {/* Solo se muestra si isMenuOpen es true */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl flex flex-col p-4 gap-4 animate-fade-in-down">
                    <Link to="/" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-50">
                        Inicio
                    </Link>
                    <Link to="/catalogo" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium py-2 px-4 rounded hover:bg-gray-50">
                        Catálogo
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    {isAuthenticated ? (
                        <Link to="/admin" onClick={closeMenu} className="bg-primary text-white px-4 py-3 rounded-xl font-bold text-center shadow-lg">
                            Ir al Panel Admin
                        </Link>
                    ) : (
                        <Link to="/login" onClick={closeMenu} className="flex items-center justify-center gap-2 text-gray-500 font-bold py-2">
                            <span className="material-symbols-outlined">lock</span>
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}