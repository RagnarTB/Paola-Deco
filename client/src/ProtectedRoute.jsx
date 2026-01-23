// client/src/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // Si está cargando la verificación, mostramos un spinner o nada
    if (loading) return <h1>Cargando...</h1>;

    // Si NO está autenticado y terminó de cargar, lo mandamos al login
    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

    // Si sí está autenticado, lo dejamos pasar a las rutas hijas (Outlet)
    return <Outlet />;
};