const express = require('express')
const router = express.Router()
const { createWaiter, getAllWaiters, getWaiter, updateWaiter, deleteWaiter } = require('../controllers/waitersControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/waiter',protect, getWaiter)
router.route('/').post(protect, createWaiter).put(protect,updateWaiter).delete(protect,deleteWaiter)
router.get('/:id',protect,getAllWaiters)

module.exports = router