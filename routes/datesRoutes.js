const express = require('express')
const router = express.Router()
const { createDate, getAllDates, getDate, updateDate, deleteDate } = require('../controllers/datesControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/date',protect, getDate)
router.route('/').post(protect,createDate).get(protect,getAllDates).put(protect,updateDate).delete(protect,deleteDate)

module.exports = router;