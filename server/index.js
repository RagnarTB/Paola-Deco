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

// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL // Para producción (Render, Vercel, etc)
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origin (Postman, curl, mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(
                new Error('La política CORS no permite acceso desde este origen.'),
                false
            );
        }

        return callback(null, true);
    },
    credentials: true
}));


app.use(express.json());
app.use(cookieParser()); // <--- CAMBIO 5: Usar cookie-parser
app.use('/api/users', userRoutes);


app.get('/ping', (req, res) => res.send('pong'));

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