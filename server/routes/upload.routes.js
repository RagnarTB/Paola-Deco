import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// POST: /api/upload -> Sube 1 foto y devuelve la URL
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No se envió archivo" });

        const result = await uploadImage(req.file.path);
        await fs.unlink(req.file.path); // Borrar temporal

        res.json({ url: result.secure_url });
    } catch (error) {
        if (req.file) await fs.unlink(req.file.path).catch(e => { });
        res.status(500).json({ message: error.message });
    }
});

export default router;