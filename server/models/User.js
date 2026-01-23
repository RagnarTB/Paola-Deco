// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // No pueden haber dos admins con el mismo correo
        trim: true
    },
    password: {
        type: String,
        required: true // Aquí se guardará encriptada
    },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        default: 'editor'
    }, 
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);