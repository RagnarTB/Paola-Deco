// client/src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from "../api/services.api"; // <-- IMPORTAMOS logoutRequest
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    // Función de Registro
    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Error completo en signup:", error);

            if (error.response && error.response.data) {
                setErrors(
                    Array.isArray(error.response.data)
                        ? error.response.data
                        : [error.response.data.message]
                );
            } else {
                setErrors([error.message || "Error de conexión con el servidor"]);
            }
        }
    };

    // Función de Login
    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Error completo en signin:", error);

            if (error.response && error.response.data) {
                setErrors(
                    Array.isArray(error.response.data)
                        ? error.response.data
                        : [error.response.data.message]
                );
            } else {
                setErrors([error.message || "Error de conexión con el servidor"]);
            }
        }
    };

    // --- NUEVA FUNCIÓN LOGOUT ---
    const logout = async () => {
        try {
            await logoutRequest();          // Avisamos al backend
        } catch (error) {
            console.log("Error en logout (se continúa igual):", error);
        } finally {
            Cookies.remove("token");       // Borramos la cookie
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,          // <-- EXPORTADO
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
