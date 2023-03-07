const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')



const registrarUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Faltan datos, favor de  verificar')
    }

    const userExiste = await User.findOne({email})

    if(userExiste){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    //Hash password
    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            message: 'Usuario registrado'
        })
    } else {
        res.status(400)
        throw new Error('No se pudo agregar el usuario')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login Usuario' })
})

const deleteUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Data Usuario' })
})

module.exports = {
    registrarUser,
    loginUser,
    deleteUser
}