const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    texto: {
        type: String,
        required: [true, 'Por favor teclea un valor']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)