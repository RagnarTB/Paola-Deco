import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    imageUrl: String, // URL de la imagen en Cloudinary
    buttonText: String,
    link: String
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
    heroSlides: [slideSchema]
}, { timestamps: true });

export default mongoose.model('Config', configSchema);