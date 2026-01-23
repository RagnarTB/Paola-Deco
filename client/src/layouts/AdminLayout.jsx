// client/src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar";

export function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 font-display">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto h-screen p-8">
                <Outlet /> {/* Aquí se renderizarán Dashboard, Categorías, Config... */}
            </main>
        </div>
    );
}