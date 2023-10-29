const express = require('express')
const router = express.Router()
const { createDate, getAllDates, getDate, updateDate, deleteDate } = require('../controllers/datesControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/date/:id',protect, getDate)
router.route('/').post(protect,createDate).get(protect,getAllDates).delete(protect,deleteDate)
router.put('/:id', protect, updateDate)

module.exports = router;