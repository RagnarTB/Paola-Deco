// server/libs/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Función reutilizable para subir imágenes
export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'paola-deco-services' // Carpeta donde se guardarán en la nube
    });
};

// Función para borrar imágenes (útil si borras un servicio luego)
export const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};