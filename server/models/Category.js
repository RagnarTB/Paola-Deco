import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // No pueden haber dos categorías iguales
        trim: true
    },
    slug: {
        type: String, // Para la URL (ej: "baby-shower")
        lowercase: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: { type: String }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);