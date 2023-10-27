const express = require('express')
const router = express.Router()
const { createWaiter, getAllWaiters, getWaiter, updateWaiter, deleteWaiter } = require('../controllers/waitersControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/waiter',protect, getWaiter)
router.route('/').post(protect, createWaiter).get(protect,getAllWaiters).put(protect,updateWaiter).delete(protect,deleteWaiter)

module.exports = router