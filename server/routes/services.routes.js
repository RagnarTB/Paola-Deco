// server/routes/services.routes.js
import { Router } from 'express';
import Service from '../models/Service.js';
import multer from 'multer';
import { uploadImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

const router = Router();

// Configuración de Multer (archivos temporales en 'uploads')
const upload = multer({ dest: 'uploads/' });

// GET: Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Obtener un solo servicio por ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        res.json(service);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// POST: Crear servicio con MÚLTIPLES IMÁGENES
// 'upload.array("images", 5)' permite hasta 5 archivos en el campo "images"
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, category, price, description } = req.body;
        let imageURLs = [];

        // Si hay archivos, los subimos todos a Cloudinary
        if (req.files && req.files.length > 0) {
            // Subida en paralelo
            const uploadPromises = req.files.map(file => uploadImage(file.path));
            const results = await Promise.all(uploadPromises);

            // Extraemos las URLs seguras
            imageURLs = results.map(result => result.secure_url);

            // Borramos archivos temporales
            await Promise.all(
                req.files.map(file => fs.unlink(file.path))
            );
        }

        const newService = new Service({
            title,
            category,
            price,
            description,
            images: imageURLs // Guardamos array de imágenes
        });

        await newService.save();
        res.json(newService);
    } catch (error) {
        // Limpieza de emergencia si algo falla
        if (req.files) {
            await Promise.all(
                req.files.map(file =>
                    fs.unlink(file.path).catch(e => console.log("Error limpiando archivo:", e))
                )
            );
        }
        return res.status(500).json({ message: error.message });
    }
});

// DELETE: Eliminar servicio por ID
router.delete('/:id', async (req, res) => {
    try {
        const serviceDeleted = await Service.findByIdAndDelete(req.params.id);

        if (!serviceDeleted) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        // OPCIONAL: Aquí puedes borrar imágenes de Cloudinary si guardas public_id
        // import { deleteImage } from '../libs/cloudinary.js';
        // for (const img of serviceDeleted.images) { await deleteImage(public_id) }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
