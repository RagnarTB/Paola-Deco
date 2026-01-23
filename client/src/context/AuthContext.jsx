import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from "../api/services.api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true); // <--- NUEVO ESTADO IMPORTANTE

    const signup = async (userData) => { /* ... tu código igual ... */ };

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            // ... tu manejo de errores ...
            setErrors(error.response?.data || ["Error al ingresar"]);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.log(error);
        } finally {
            Cookies.remove("token");
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // EFECTO MÁGICO: Verifica la sesión al cargar la página
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                // Verificamos si el token es válido en el backend
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                // Si es válido, restauramos la sesión
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                user,
                isAuthenticated,
                errors,
                loading, // <--- EXPORTAMOS LOADING
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};