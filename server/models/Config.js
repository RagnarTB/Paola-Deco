import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    imageUrl: String, // URL de la imagen en Cloudinary
    buttonText: String,
    link: String
});
const featureSchema = new mongoose.Schema({
    icon: String, // Nombre del icono de Google Fonts
    title: String,
    description: String
});

const configSchema = new mongoose.Schema({
    // Identidad
    siteName: { type: String, default: "Paola Deco & Eventos" },
    logoUrl: String,

    // Contacto
    whatsapp: String,
    phone: String,
    email: String,
    address: String,
    facebookUrl: String,
    instagramUrl: String,

    // Carrusel del Home (Array de slides)
    heroSlides: [slideSchema],
    tiktokVideos: [{
        url: String, // URL del video (ej: https://www.tiktok.com/@usuario/video/123456)
        embedId: String // ID extraído para el embed
    }], features: [featureSchema]
}, { timestamps: true });

export default mongoose.model('Config', configSchema);