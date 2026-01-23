// client/src/components/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AdminSidebar() {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "bg-primary/10 text-primary font-bold" : "text-gray-600 hover:text-primary hover:bg-gray-50";

    return (
        <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6 sticky top-0 h-screen z-10">
            <div className="flex items-center gap-2 mb-10 text-primary">
                <span className="material-symbols-outlined text-3xl">celebration</span>
                <h1 className="text-xl font-bold">Paola Deco</h1>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
                <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin')}`}>
                    <span className="material-symbols-outlined">grid_view</span>
                    Servicios
                </Link>

                <Link to="/admin/categorias" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/categorias')}`}>
                    <span className="material-symbols-outlined">category</span>
                    Categorías
                </Link>

                <Link to="/admin/configuracion" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/configuracion')}`}>
                    <span className="material-symbols-outlined">settings</span>
                    Configuración
                </Link>

                <div className="my-4 border-t border-gray-100"></div>

                <Link to="/catalogo" className="flex items-center gap-3 text-gray-500 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                    Ver Catálogo
                </Link>
            </nav>

            <button onClick={() => logout()} className="flex items-center gap-3 text-gray-500 hover:text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors w-full text-left mt-auto">
                <span className="material-symbols-outlined">logout</span>
                Cerrar Sesión
            </button>
        </aside>
    );
}