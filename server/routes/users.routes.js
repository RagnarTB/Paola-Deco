import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();
const ROOT_EMAIL = "admin@paoladeco.com"; // El correo del Super Admin intocable

// GET: Listar
router.get('/', authRequired, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// POST: Crear
router.post('/', authRequired, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["El email ya está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: passwordHash, role: role || 'editor', isActive: true
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Editar usuario (Activar, Desactivar, Cambiar datos)
router.put('/:id', authRequired, async (req, res) => {
    try {
        const { username, email, role, isActive, password } = req.body;

        // 1. Buscar usuario objetivo
        const userToUpdate = await User.findById(req.params.id);
        if (!userToUpdate) return res.status(404).json({ message: "Usuario no encontrado" });

        // 2. PROTECCIÓN ROOT: Si intentan editar al Root Admin
        if (userToUpdate.email === ROOT_EMAIL) {
            return res.status(403).json({ message: "No se puede modificar al Administrador Principal" });
        }

        // 3. Preparar datos
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Si envían contraseña, la encriptamos. Si no, no la tocamos.
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Eliminar
router.delete('/:id', authRequired, async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        if (!userToDelete) return res.status(404).json({ message: "Usuario no encontrado" });

        // PROTECCIÓN ROOT
        if (userToDelete.email === ROOT_EMAIL) {
            return res.status(403).json({ message: "No se puede eliminar al Administrador Principal" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;