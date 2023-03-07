const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Por favor teclea el nombre del usuario']

    },
    email: {
        type: String,
        require: [true, 'Por favor teclea el email del usuario'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Por favor teclea la contraseña del usuario']
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)