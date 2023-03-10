const express = require('express')
const router = express.Router()
const { getTareas, setTarea, updateTarea, deleteTarea } = require('../controllers/tareaController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getTareas).post(protect, setTarea)

router.route('/:id').put(protect, updateTarea).delete(protect, deleteTarea)
// router.get('/', getTareas)
// router.post('/', setTarea)
// router.put('/:id', updateTarea)
// router.delete('/:id', deleteTarea )



module.exports = router