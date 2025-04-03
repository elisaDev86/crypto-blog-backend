require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const server = express();

// Connessione al database
connectDB();

// Middleware
server.use(express.json());
server.use(cors());

// Test API
server.get('/', (req, res) => {
    res.send('API is running...');
});

// Avvia il server sulla porta 5001
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
