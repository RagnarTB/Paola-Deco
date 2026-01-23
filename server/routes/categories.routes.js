// server/routes/categories.routes.js
import { Router } from 'express';
import Category from '../models/Category.js';
import Service from '../models/Service.js';

const router = Router();

/* ======================================================
   GET: Obtener todas las categorías (ordenadas)
====================================================== */
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   POST: Crear nueva categoría (Forzamos MAYÚSCULAS)
====================================================== */
router.post('/', async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        const upperName = name.trim().toUpperCase();

        // Validar duplicado
        const exists = await Category.findOne({ name: upperName });
        if (exists) {
            return res.status(400).json({ message: "La categoría ya existe" });
        }

        const newCategory = new Category({
            name: upperName,
            slug: upperName.toLowerCase().replace(/ /g, '-'),
            isActive: true,
            image: image || null
        });

        await newCategory.save();
        res.json(newCategory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   PUT: Editar nombre / Activar / Desactivar categoría
====================================================== */
router.put('/:id', async (req, res) => {
    try {
        const { name, isActive, image } = req.body;
        if (image !== undefined) updateData.image = image;

        // 1. Si intentan DESACTIVAR, verificamos servicios activos
        if (isActive === false || isActive === 'false') {
            const category = await Category.findById(req.params.id);

            if (category) {
                const servicesCount = await Service.countDocuments({
                    category: category.name,
                    isActive: true
                });

                if (servicesCount > 0) {
                    return res.status(400).json({
                        message: `No se puede desactivar. Hay ${servicesCount} servicios activos en esta categoría.`
                    });
                }
            }
        }

        const updateData = {};

        // Actualizar nombre si viene
        if (name && name.trim()) {
            const upperName = name.trim().toUpperCase();

            // Validar duplicado en edición
            const exists = await Category.findOne({
                name: upperName,
                _id: { $ne: req.params.id }
            });

            if (exists) {
                return res.status(400).json({
                    message: "Ya existe otra categoría con ese nombre"
                });
            }

            updateData.name = upperName;
            updateData.slug = upperName.toLowerCase().replace(/ /g, '-');
        }

        // Actualizar estado si viene
        if (isActive !== undefined) {
            updateData.isActive = isActive === true || isActive === 'true';
        }

        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   DELETE: Borrar categoría (CON PROTECCIÓN)
====================================================== */
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Verificación: ningún servicio debe usar esta categoría
        const servicesUsingIt = await Service.find({
            category: category.name
        });

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
