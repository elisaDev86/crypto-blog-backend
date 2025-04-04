const jwt = require('jsonwebtoken');

// Funzione per generare il token JWT (access token)
const generateToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };

    // Restituisce un JWT con una durata di 90 giorni
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' });
};

// Funzione per generare il refresh token
const generateRefreshToken = (userId) => {
    const payload = {
        user: {
            id: userId
        }
    };

    // Restituisce un JWT con una durata di 365 giorni (1 anno)
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '365d' });
};

// Funzione per decodificare il token JWT senza verificarlo
const decodeToken = (token) => {
    return jwt.decode(token); // Decodifica il token senza verificarlo
};

// Funzione per verificare il token JWT (resta valido per la durata specificata)
const verifyToken = (token) => {
    try {
        // Verifica e decodifica il token, restituendo il payload se il token è valido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Token non valido');
    }
};

// Funzione per verificare il refresh token
const verifyRefreshToken = (token) => {
    try {
        // Verifica il refresh token con una chiave diversa per maggiore sicurezza
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Refresh token non valido');
    }
};

module.exports = {
    generateToken,
    generateRefreshToken,
    decodeToken,
    verifyToken,
    verifyRefreshToken
};
