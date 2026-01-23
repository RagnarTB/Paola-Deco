// client/src/api/services.api.js
import axios from 'axios';

// Instancia central de Axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

/* ======================================================
   SERVICIOS
====================================================== */

// Obtener servicios con filtros, búsqueda, paginación
// Ej: getAllServices({ page: 1, search: 'boda', category: 'BODAS' })
export const getAllServices = (params) => {
    return axiosInstance.get('/services', { params });
};

// Obtener un solo servicio
export const getService = (id) => {
    return axiosInstance.get(`/services/${id}`);
};

// Crear servicio (con imágenes)
export const createService = (service) => {
    return axiosInstance.post('/services', service, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

// Actualizar servicio (editar datos / activar / desactivar)
export const updateService = (id, data) => {
    return axiosInstance.put(`/services/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

// Eliminar servicio
export const deleteService = (id) => {
    return axiosInstance.delete(`/services/${id}`);
};

/* ======================================================
   AUTENTICACIÓN
====================================================== */

export const registerRequest = (user) => {
    return axiosInstance.post('/auth/register', user);
};

export const loginRequest = (user) => {
    return axiosInstance.post('/auth/login', user);
};

export const logoutRequest = () => {
    return axiosInstance.post('/auth/logout');
};

/* ======================================================
   CATEGORÍAS
====================================================== */

export const getCategories = () => {
    return axiosInstance.get('/categories');
};

export const createCategory = (category) => {
    return axiosInstance.post('/categories', category);
};

export const updateCategory = (id, data) => {
    return axiosInstance.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
    return axiosInstance.delete(`/categories/${id}`);
};

/* ======================================================
   CONFIGURACIÓN GENERAL
====================================================== */

export const getConfig = () => {
    return axiosInstance.get('/config');
};

export const updateConfig = (data) => {
    return axiosInstance.put('/config', data);
};

/* ======================================================
   SUBIDA DE ARCHIVOS (Cloudinary / Upload)
====================================================== */

export const uploadFile = (formData) => {
    return axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
