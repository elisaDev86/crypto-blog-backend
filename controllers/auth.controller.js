const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Funzione per la registrazione
const registerUser = async (req, res) => {
    // Validazione dei dati
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Controlla se l'utente esiste già
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Utente già registrato!' });
        }

        // Crea un nuovo utente
        user = new User({
            name,
            email,
            password
        });


        // Salva l'utente nel DB
        await user.save();

        // Crea il payload per il JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Genera il token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' });

        // Rispondi con il token
        res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Errore del server');
    }
};

// Funzione per il login
const loginUser = async (req, res) => {
    // Validazione dei dati
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Verifica se l'utente esiste nel database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Utente non trovato' });
        }

        // Confronta la password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenziali errate' });
        }

        // Crea il payload per il JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Genera il token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' });

        // Rispondi con il token
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Errore del server');
    }
};

module.exports = { registerUser, loginUser };
