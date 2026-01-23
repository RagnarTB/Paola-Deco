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
   PUT: Actualizar Servicio (Editar + Estado + Imágenes)
====================================================== */
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        // Nota: 'existingImages' viene del frontend con las fotos que NO borraste
        const { title, category, price, description, isActive, existingImages } = req.body;

        let updateData = { title, category, price, description };

        // Actualizar estado si viene
        if (isActive !== undefined) {
            updateData.isActive = isActive === 'true' || isActive === true;
        }

        // --- LÓGICA DE IMÁGENES MEJORADA ---

        // 1. Recuperamos las imágenes antiguas que el usuario decidió mantener
        // (Si el frontend manda solo una string, la convertimos a array)
        let finalImages = existingImages
            ? (Array.isArray(existingImages) ? existingImages : [existingImages])
            : [];

        // 2. Subimos las NUEVAS imágenes (si hay)
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadImage(file.path));
            const results = await Promise.all(uploadPromises);
            const newImageURLs = results.map(result => result.secure_url);

            // Sumamos las nuevas a las existentes
            finalImages = [...finalImages, ...newImageURLs];

            // Limpieza
            await Promise.all(req.files.map(file => fs.unlink(file.path)));
        }

        // Solo actualizamos el campo images si tenemos un array final válido
        // Ojo: Si finalImages está vacío, significa que el usuario borró TODAS las fotos
        // Si no enviamos nada de images/existingImages, asumimos que no se tocó esa parte
        if (req.files.length > 0 || existingImages) {
            updateData.images = finalImages;
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
        if (req.files) {
            await Promise.all(req.files.map(file => fs.unlink(file.path).catch(e => { })));
        }
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