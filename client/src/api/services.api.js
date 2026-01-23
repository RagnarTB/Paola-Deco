// client/src/api/services.api.js
import axios from 'axios';

// Creamos una instancia de Axios con la configuración base
const servicesApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL // Lee la variable del archivo .env
});

// Función para obtener todos los servicios
export const getAllServices = () => {
    return servicesApi.get('/services'); // Pide a http://localhost:5000/api/services
};

// Función para crear un servicio (la usaremos pronto)
export const createService = (serviceData) => {
    return servicesApi.post('/services', serviceData);
};