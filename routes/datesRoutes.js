const express = require('express')
const router = express.Router()
const { createDate, getAllDates, getDate,deleteDate } = require('../controllers/datesControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/date/:id',protect, getDate)
router.route('/').post(protect,createDate).get(protect,getAllDates)
router.delete('/:id',protect,deleteDate)

module.exports = router;