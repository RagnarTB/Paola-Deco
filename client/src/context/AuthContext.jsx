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
            
            // Guardar token en localStorage para móviles
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            const data = error.response?.data;
            // Normalizar siempre a array: puede venir como objeto {message:...}, array, o string
            if (Array.isArray(data)) {
                setErrors(data);
            } else if (data?.message) {
                setErrors([data.message]);
            } else {
                setErrors(["Email o contraseña incorrectos"]);
            }
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.log(error);
        } finally {
            Cookies.remove("token");
            localStorage.removeItem('token'); // Limpiar localStorage
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // EFECTO MÁGICO: Verifica la sesión al cargar la página
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            let token = cookies.token;
            
            // Si no hay token en cookies, buscar en localStorage (móviles)
            if (!token) {
                token = localStorage.getItem('token');
            }

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                // Verificamos si el token es válido en el backend
                const res = await verifyTokenRequest(token);
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
                setErrors,  // <--- exportar para que login pueda limpiarlos
                loading, // <--- EXPORTAMOS LOADING
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};