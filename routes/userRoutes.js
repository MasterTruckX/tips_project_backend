const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData, updateUserAdmin } = require('../controllers/usersControllers')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getMe',protect, getUserData)
router.put('/:id',protectAdmin, updateUserAdmin)

module.exports = router;
