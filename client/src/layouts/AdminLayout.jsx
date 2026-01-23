import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";

export function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 font-display">

            {/* Overlay Oscuro para móvil (solo se ve cuando el menú está abierto) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar (Ahora responde al estado en móviles) */}
            <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Header Móvil (Botón Hamburguesa) */}
                <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4 md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-primary">
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                    <span className="font-bold text-lg text-gray-800">Panel de Administración</span>
                </header>

                {/* Área de contenido con scroll propio */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}