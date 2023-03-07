const express = require('express')
const router = express.Router()
const {registrarUser,loginUser,deleteUser} = require('../controllers/userController')

router.post('/', registrarUser)
router.post('/login', loginUser)
router.get('/data', deleteUser)


module.exports = router