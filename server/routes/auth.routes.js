// server/routes/auth.routes.js
import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

const router = Router();

// REGISTER: Crear el usuario Admin (Solo lo usarás una vez)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // 2. Crear usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        // 3. Guardar en DB
        const userSaved = await newUser.save();

        // 4. Crear Token (Login automático al registrarse)
        const token = await createAccessToken({ id: userSaved._id });

        // 5. Enviar token en una cookie
        res.cookie('token', token, {
            // Opciones de seguridad (httpOnly evita que JS lea la cookie)
            // secure: true, // Descomentar en producción (https)
            // sameSite: 'none', // Descomentar en producción
        });

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// LOGIN: Entrar al sistema
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar usuario por email
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        if (userFound.isActive === false) {
            return res.status(401).json({ message: "Cuenta desactivada. Contacte al administrador." });
        }

        // 2. Comparar contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // 3. Crear Token
        const token = await createAccessToken({ id: userFound._id });

        // 4. Enviar cookie
        res.cookie('token', token);

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// LOGOUT: Salir
router.post('/logout', (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
});

export default router;