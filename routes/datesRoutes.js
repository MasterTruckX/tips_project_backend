const express = require('express')
const router = express.Router()
const { createDate, getAllDates, getDate, updateDate, deleteDate } = require('../controllers/datesControllers')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

router.post('/:id',createDate)
router.get('/:id', getAllDates)
router.get('/date/:id', getDate)
router.put('/:id', updateDate)
router.delete('/:id', deleteDate)

module.exports = router;