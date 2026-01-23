import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import serviceRoutes from './routes/services.routes.js'; // <--- 1. IMPORTAR RUTAS

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// --- ZONA DE RUTAS ---
app.use('/api/services', serviceRoutes); // <--- 2. USAR RUTAS
// Esto significa que todo lo de serviceRoutes empezará con /api/services

app.get('/', (req, res) => {
    res.send('API Paola Deco funcionando');
});

const startServer = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log(' Conectado a MongoDB Atlas');
        }
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Error:', error);
    }
};

startServer();