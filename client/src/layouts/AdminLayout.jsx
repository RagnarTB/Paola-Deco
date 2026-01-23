import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";

export function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        // Usamos h-screen y overflow-hidden para evitar que toda la página haga scroll, solo el contenido
        <div className="flex h-screen bg-gray-100 font-display overflow-hidden">

            {/* Overlay Oscuro para móvil (z-40 para estar debajo del sidebar pero encima del contenido) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar (z-50 para estar encima de todo en móvil) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:shadow-none md:z-auto
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col h-full w-full relative overflow-hidden">

                {/* Header Móvil */}
                <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4 md:hidden flex-shrink-0 z-20">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600 hover:text-primary p-1 rounded focus:outline-none"
                    >
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                    <span className="font-bold text-lg text-gray-800">Panel Admin</span>
                </header>

                {/* Área Scrollable Independiente */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}