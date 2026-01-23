// server/routes/auth.routes.js
import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "PaolaDecoSecretKey2026";

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
            httpOnly: true, // Evita que JS lea la cookie (seguridad XSS)
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' para cross-origin en producción
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
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
        res.cookie('token', token, {
            httpOnly: true, // Evita que JS lea la cookie (seguridad XSS)
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' para cross-origin en producción
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });

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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(0)
    });
    return res.sendStatus(200);
});

// VERIFICAR TOKEN (Para persistencia de sesión)
router.get('/verify', async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, process.env.TOKEN_SECRET || "claveSecreta123", async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        });
    });
});

export default router;