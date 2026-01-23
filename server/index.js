import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; // <--- CAMBIO 1: Importar
import serviceRoutes from './routes/services.routes.js';
import authRoutes from './routes/auth.routes.js'; // <--- CAMBIO 2: Importar rutas auth
import categoryRoutes from './routes/categories.routes.js';
import configRoutes from './routes/config.routes.js'; // Importar
import uploadRoutes from './routes/upload.routes.js';
import { createAdminUser } from './libs/initialSetup.js';
import userRoutes from './routes/users.routes.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir cookies del frontend
app.use(cors({
    origin: 'http://localhost:5173', // <--- CAMBIO 3: Especificar URL exacta del frontend
    credentials: true // <--- CAMBIO 4: Permitir cookies
}));

app.use(express.json());
app.use(cookieParser()); // <--- CAMBIO 5: Usar cookie-parser
app.use('/api/users', userRoutes);

// Rutas
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes); // <--- CAMBIO 6: Usar rutas auth
app.use('/api/categories', categoryRoutes);
app.use('/api/config', configRoutes); // <--- Usar
app.use('/api/upload', uploadRoutes);

// ... el resto de la conexión a DB y startServer sigue igual ...
const startServer = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log(' Conectado a MongoDB Atlas');
            await createAdminUser();
        }
        app.listen(PORT, () => {
            console.log(` Servidor corriendo en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Error:', error);
    }
};

startServer();