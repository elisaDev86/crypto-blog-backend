// gestione delle operazioni relative alle interazioni tramite emoticon
const Reaction = require('../models/interaction');

// Aggiungi una reazione a una crypto
const addReaction = async (req, res) => {
    const { emoji, crypto } = req.body;

    try {
        const newReaction = new Reaction({
            emoji,
            crypto,
            user: req.user.id
        });

        const saved = await newReaction.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Errore nel salvataggio della reazione' });
    }
};

// Ottieni tutte le reazioni per una crypto
const getReactionsByCrypto = async (req, res) => {
    try {
        const { crypto } = req.params;

        const reactions = await Reaction.find({ crypto }).populate('user', 'name');
        res.json(reactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Errore nel recupero delle reazioni' });
    }
};

module.exports = { addReaction, getReactionsByCrypto };
