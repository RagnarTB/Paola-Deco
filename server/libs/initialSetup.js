// server/libs/initialSetup.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createAdminUser = async () => {
    try {
        // Verificar si ya existe algún usuario
        const count = await User.estimatedDocumentCount();

        if (count > 0) return; // Si ya hay usuarios, no hacemos nada

        // Si no hay nadie, creamos al Admin por defecto
        const passwordHash = await bcrypt.hash("Admin123!@", 10); // <--- CAMBIA ESTO LUEGO

        const user = new User({
            username: "Paola Admin",
            email: "admin@paoladeco.com",
            password: passwordHash,
            role: "admin"
        });

        await user.save();
        console.log(' Usuario Admin creado por defecto: admin@paoladeco.com / Admin123!@');
    } catch (error) {
        console.error(error);
    }
};