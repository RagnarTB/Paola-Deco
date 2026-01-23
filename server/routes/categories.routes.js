import { Router } from 'express';
import Category from '../models/Category.js';
import Service from '../models/Service.js'; // Importamos Servicio para verificar

const router = Router();

// GET: Obtener todas
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// POST: Crear nueva
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({
            name,
            slug: name.toLowerCase().replace(/ /g, '-')
        });
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Borrar (CON PROTECCIÓN)
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

        // VERIFICACIÓN DE SEGURIDAD
        const servicesUsingIt = await Service.find({ category: category.name });

        if (servicesUsingIt.length > 0) {
            return res.status(400).json({
                message: `No se puede eliminar. Hay ${servicesUsingIt.length} servicios en la categoría '${category.name}'. Edita esos servicios primero.`
            });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;