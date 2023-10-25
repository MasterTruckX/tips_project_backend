const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUserData, updateUserAdmin, updateUser, deleteUser } = require('../controllers/usersControllers')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getMe',protect, getUserData)
router.put('/update/:id',protect, updateUser)
router.route('/:id').delete(protectAdmin,deleteUser).put(protectAdmin, updateUserAdmin)

module.exports = router;
