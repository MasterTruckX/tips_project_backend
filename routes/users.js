const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/usersControllers')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


router.post('/', registerUser);

module.exports = router;
