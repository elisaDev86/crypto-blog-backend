const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Leggi il token dall'header
    const authHeader = req.header('Authorization');

    // Controlla se esiste
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Nessun token, autorizzazione negata' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attacca l'utente alla request
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token non valido' });
    }
};
