// rotte API per interagire con il sistema di emoticon
const express = require('express');
const { addReaction, getReactionsByCrypto } = require('../controllers/interaction.controller');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/reactions
router.post('/add', auth, addReaction);

// GET /api/reactions/:crypto
router.get('/:crypto', getReactionsByCrypto);

module.exports = router;
