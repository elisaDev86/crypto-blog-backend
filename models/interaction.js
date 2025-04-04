// schema per le interazioni tramite emoticon con riferimento all'utente

const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    emoji: {
        type: String,
        required: true
    },
    crypto: {
        type: String, // ad esempio: 'BTC', 'ETH', ecc.
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reaction', ReactionSchema);
