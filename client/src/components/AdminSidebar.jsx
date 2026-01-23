import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Recibimos la función onClose para cerrar el menú en móvil al hacer clic
export function AdminSidebar({ onClose }) {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path
        ? "bg-primary/10 text-primary font-bold shadow-sm"
        : "text-gray-600 hover:text-primary hover:bg-gray-50";

    // Función auxiliar para cerrar menú al navegar
    const handleLinkClick = () => {
        if (onClose) onClose();
    };

    return (
        <aside className="w-64 bg-white border-r flex flex-col h-full">
            {/* Header Sidebar */}
            <div className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-3xl">celebration</span>
                    <h1 className="text-xl font-bold">Paola Deco</h1>
                </div>
                {/* Botón X solo visible en móvil */}
                <button onClick={onClose} className="md:hidden text-gray-400">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <nav className="flex flex-col gap-2 flex-1 px-4 overflow-y-auto">
                <Link to="/admin" onClick={handleLinkClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin')}`}>
                    <span className="material-symbols-outlined">grid_view</span>
                    Servicios
                </Link>

                <Link to="/admin/categorias" onClick={handleLinkClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/categorias')}`}>
                    <span className="material-symbols-outlined">category</span>
                    Categorías
                </Link>

                <Link to="/admin/configuracion" onClick={handleLinkClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/configuracion')}`}>
                    <span className="material-symbols-outlined">settings</span>
                    Configuración
                </Link>

                <div className="my-4 border-t border-gray-100"></div>

                <Link to="/catalogo" onClick={handleLinkClick} className="flex items-center gap-3 text-gray-500 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                    Ver Catálogo
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button onClick={() => { logout(); handleLinkClick(); }} className="flex items-center gap-3 text-gray-500 hover:text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors w-full text-left">
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}