const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const registerUser = asyncHandler(
    //verify form is not empty
    async(req, res, next) => {
    const { name, username, password } = req.body
    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please fill-in all the fields.')
    }
    // verify user existance
    const userExists = await prisma.user.findFirst({
        where: {OR: [{username},{name}]}
    })
    if(userExists) {
        res.status(400)
        throw new Error('This user already exists.')
    }
    //generate hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user in the db
    const user = await prisma.user.create({
        data: {
            username,
            name,
            password: hashedPassword,
            admin: false
        }

    })
    // display result
    if(user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            username: user.username
        })
    }else {
        res.status(500)
        throw new Error('User was not created. Please check the data submitted.')
    }
    }
)

module.exports = {
    registerUser
}