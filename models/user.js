const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definizione dello schema per l'utente
const UserSchema = new mongoose.Schema({
    // Nome utente univoco e obbligatorio
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // Email univoca, obbligatoria e validata con espressione regolare
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                // Espressione regolare per validare l'email
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} non è un'email valida!`
        }
    },
    // Password obbligatoria
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // Data di creazione dell'utente, impostata automaticamente
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware Mongoose che esegue prima di salvare un documento
UserSchema.pre('save', async function (next) {
    // Se la password non è stata modificata, passa al prossimo middleware
    if (!this.isModified('password')) return next();

    // Genera un "sale" per l'hashing della password
    const salt = await bcrypt.genSalt(10);
    // Hash della password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Metodo per confrontare la password inserita con quella salvata nel database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Creazione del modello User basato sullo schema definito
const User = mongoose.model('User', UserSchema);

module.exports = User;
