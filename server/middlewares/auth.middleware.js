import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    // Intentar obtener token de cookies primero (desktop)
    let token = req.cookies.token;
    
    // Si no hay token en cookies, intentar obtenerlo del header Authorization (móvil)
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remover 'Bearer ' del inicio
        }
    }

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, process.env.TOKEN_SECRET || "PaolaDecoSecretKey2026", (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = user;
        next();
    });
};