// server/models/Service.js
import mongoose from 'mongoose';

// Definimos el esquema (las reglas de nuestros datos)
const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Es obligatorio
        trim: true      // Quita espacios al inicio y final
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String // Aquí guardaremos las URLs de las fotos
    }],
    features: [{
        type: String // Lista de características (ej: "Incluye arco", "Luces LED")
    }],
    isPopular: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true // Esto crea automáticamente campos "createdAt" y "updatedAt"
});

export default mongoose.model('Service', serviceSchema);