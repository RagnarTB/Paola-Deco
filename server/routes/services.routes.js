// server/routes/services.routes.js
import { Router } from 'express';
import Service from '../models/Service.js';
import multer from 'multer';
import { uploadImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

const router = Router();

// Multer: archivos temporales en /uploads
const upload = multer({ dest: 'uploads/' });

/* ======================================================
   GET: Servicios con Filtros, Búsqueda y Paginación
====================================================== */
router.get('/', async (req, res) => {
    try {
        // CORRECCIÓN AQUÍ: Agregamos minPrice y maxPrice
        const { page = 1, limit = 10, search = '', category, isActive, minPrice, maxPrice } = req.query;

        const query = {};

        // Búsqueda por título
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filtro por categoría
        if (category) query.category = category;

        // Filtro por estado
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Filtro de Precios
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const services = await Service.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Service.countDocuments(query);

        res.json({
            services,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            totalServices: total
        });
    } catch (error) {
        console.error(error); // Ver error en consola
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   GET: Obtener un solo servicio por ID
====================================================== */
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   POST: Crear Servicio con MÚLTIPLES IMÁGENES
====================================================== */
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, category, price, description, isActive } = req.body;
        let imageURLs = [];

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadImage(file.path));
            const results = await Promise.all(uploadPromises);

            imageURLs = results.map(result => result.secure_url);

            // Limpieza de temporales
            await Promise.all(req.files.map(file => fs.unlink(file.path)));
        }

        const newService = new Service({
            title,
            category,
            price,
            description,
            images: imageURLs,
            // Convertir a booleano seguro
            isActive: isActive === 'true' || isActive === true
        });

        await newService.save();
        res.json(newService);

    } catch (error) {
        if (req.files) {
            await Promise.all(req.files.map(file => fs.unlink(file.path).catch(e => { })));
        }
        res.status(500).json({ message: error.message });
    }
});

/* ======================================================
   PUT: Actualizar Servicio (JSON + images[])
   NOTA: Ya NO se suben archivos aquí.
   El frontend envía un JSON con 'images' (array de URLs).
====================================================== */
router.put('/:id', upload.none(), async (req, res) => {
    try {
        const { title, category, price, description, isActive, images } = req.body;

        let updateData = { title, category, price, description };

        // Estado seguro
        if (isActive !== undefined) {
            updateData.isActive = isActive === 'true' || isActive === true;
        }

        // --- LÓGICA CRÍTICA DE IMÁGENES ---

        if (images !== undefined) {
            if (images === "") {
                // Caso: borraron TODAS las imágenes
                updateData.images = [];
            } else {
                // Asegurar array aunque venga una sola string
                updateData.images = Array.isArray(images) ? images : [images];
            }
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        res.json(updatedService);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


/* ======================================================
   DELETE: Eliminar Servicio
====================================================== */
router.delete('/:id', async (req, res) => {
    try {
        const serviceDeleted = await Service.findByIdAndDelete(req.params.id);

        if (!serviceDeleted) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;