const express = require('express')
const router = express.Router()
const { createWaiter, getAllWaiters, getWaiter, updateWaiter, deleteWaiter } = require('../controllers/waitersControllers')

router.post('/:id',createWaiter)
router.get('/:id', getAllWaiters)
router.get('/waiter/:id', getWaiter)
router.put('/:id', updateWaiter)
router.delete('/:id', deleteWaiter)

module.exports = router