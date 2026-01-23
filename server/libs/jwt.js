// server/libs/jwt.js
import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET || "claveSecreta123", // Usa una clave del .env
            { expiresIn: "1d" }, // El login dura 1 día
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}