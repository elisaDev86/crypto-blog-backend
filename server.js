require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const server = express();

// Connessione al database
connectDB();

// Middleware CORS (per permettere richieste da qualsiasi origine)
server.use(cors({
    origin: '*',  // Permette tutte le origini
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware per la gestione del corpo delle richieste
server.use(express.json());

// Importare le rotte di autenticazione
const authRoutes = require('./routes/auth.routes');

// Usa le rotte di autenticazione
server.use('/api/auth', authRoutes);

//Importare le rotte per i commenti gestiti con emoticon
const reactionRoutes = require('./routes/interaction.routes');

//Usa le rotte per i commenti gestiti con emoticon
server.use('/api/reactions', reactionRoutes);

// Test API
server.get('/', (req, res) => {
    res.send('API is running...');
});

// Avvia il server sulla porta 5001
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

