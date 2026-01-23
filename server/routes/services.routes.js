// server/routes/services.routes.js
import { Router } from 'express';
import Service from '../models/Service.js';

const router = Router();

// GET: Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services); // Respondemos con los datos en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Crear un servicio (Para probar ahora mismo)
router.post('/', async (req, res) => {
    try {
        // Recibimos los datos del cuerpo de la petición
        const { title, category, price, description } = req.body;

        const newService = new Service({
            title,
            category,
            price,
            description
        });

        await newService.save(); // Guardamos en MongoDB
        res.json(newService); // Devolvemos el servicio creado
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;