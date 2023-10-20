const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const registerUser = asyncHandler(
    //verify form is not empty
    async(req, res) => {
    const { name, username, password } = req.body
    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please fill-in all the fields.')
    }
    // verify user existance
    const userExists = await prisma.user.findFirst({
        where: {username}
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
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '1hr'   
    })
}

const loginUser = asyncHandler(async(req,res)=>{
    const { username, password } = req.body
    //Verify username and pw
    const user = await prisma.user.findFirst({where: {username}})
    if ( user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            admin: user.admin,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Wrong Password.')
    }
})
const getUserData = asyncHandler(
    async(req,res) => {
        res.json(req.user)
    }
)
const updateUser = asyncHandler(
    async(req,res) => {
        const { name, password } = req.body
        if (!name || !password) {
            res.status(400)
            throw new Error('Please fill-in all the fields.')
        }
        //generate hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)        
        const user = await prisma.user.update({
            where: { id: +req.params.id },
            data: {
                name: req.body.name,
                password: hashedPassword
            }
        })
        if(user){
            res.status(200).json({ message: `${user.username} has been updated.`})
        }else{
            res.status(404)
            throw new Error('Username not found.')
        }
    }
)

const updateUserAdmin = asyncHandler(
    async(req,res) => {
        const userExists = await prisma.user.findUnique({
            where: { id: +req.params.id}})
        if ( userExists ) {
            const user = await prisma.user.update({
                where: { id: +req.params.id },
                data: { admin: true }
            })
            if(user && !user.admin) {
                res.status(200).json({ message: `${user.username} is now admin.`})
            }else if(user.admin){
                res.status(200).json({ message: `${user.username} was already admin.`})
            }
        }else {
            res.status(404)
            throw new Error('Username not found.')
        }


    }
)
const deleteUser = asyncHandler(
    async(req,res) => {
        const userExists = await prisma.user.findUnique({
            where: { id: +req.params.id}})
        if(userExists){
            const user = await prisma.user.delete({where:{id:+req.params.id}})
            res.status(200).json({ message: `${user.username} has been deleted.`})
        }else{
            res.status(404)
            throw new Error('User not found.')
        }

    }
)
module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUser,
    updateUserAdmin,
    deleteUser
}