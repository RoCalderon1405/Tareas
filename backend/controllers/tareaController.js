const asyncHandler = require('express-async-handler')

const Tarea = require('../model/tareaModel')
const User = require('../model/userModel')


const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({ user: req.user.id })
    res.status(200).json(tareas)
})

const setTarea = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        // res.status(400).json({ message:'Por favor teclea una descripción de la tarea'})
        res.status(400)
        throw new Error('Por favor teclea una descripción de la tarea')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })


    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //verificamos que el user de la tarea sea igual que esl user del token
    if(tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTarea)
})

const deleteTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    if(tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedTarea)
})

module.exports = {
    getTareas,
    setTarea,
    updateTarea,
    deleteTarea
}