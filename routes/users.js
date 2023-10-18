const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


router.post('/', async function(req, res, next) {
  const user = await prisma.user.create({
    data: req.body
  })
  res.status(201).json(user);
});

module.exports = router;
