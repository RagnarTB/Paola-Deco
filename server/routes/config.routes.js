import { Router } from 'express';
import Config from '../models/Config.js';

const router = Router();

// GET: Obtener configuración (Si no existe, devuelve una vacía por defecto)
router.get('/', async (req, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = new Config(); // Crea una en memoria con valores default
            await config.save(); // La guarda
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Actualizar configuración
router.put('/', async (req, res) => {
    try {
        // findOneAndUpdate con upsert: true (crea si no existe)
        const config = await Config.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true
        });
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;