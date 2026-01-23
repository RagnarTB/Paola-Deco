// client/src/api/services.api.js
import axios from 'axios';

// Creamos la instancia de axios (le llamaremos 'axiosInstance' para evitar confusiones)
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // Permite enviar cookies (importante para el login)
});

// --- FUNCIONES DE SERVICIOS ---

export const getAllServices = () => {
    return axiosInstance.get('/services');
};

export const getService = (id) => {
    return axiosInstance.get(`/services/${id}`);
};

export const createService = (service) => {
    return axiosInstance.post('/services', service, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// --- FUNCIONES DE AUTENTICACIÓN ---

// Aquí estaba el error antes: usábamos 'instance' que no existía
export const registerRequest = (user) => axiosInstance.post(`/auth/register`, user);

export const loginRequest = (user) => axiosInstance.post(`/auth/login`, user);

export const deleteService = (id) => axiosInstance.delete(`/services/${id}`);

export const logoutRequest = () => axiosInstance.post('/auth/logout');

//--- FUNCIONES DE CATEGORIA ---

// Categorías
export const getCategories = () => axiosInstance.get('/categories');
export const createCategory = (category) => axiosInstance.post('/categories', category);
export const deleteCategory = (id) => axiosInstance.delete(`/categories/${id}`);

// Configuración
export const getConfig = () => axiosInstance.get('/config');
export const updateConfig = (data) => axiosInstance.put('/config', data);

export const uploadFile = (formData) => axiosInstance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});