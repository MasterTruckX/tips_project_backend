const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // obtain token
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            //obtain user's id from token
            req.user = await prisma.user.findUnique({where:{id:payload.id}})
            delete req.user.password
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized.')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error ('Unauthorized. Token was not received')
    }
})

const protectAdmin = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // obtain token
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            //obtain user's id from token
            const user = await prisma.user.findUnique({where:{id:payload.id}})
            //admin check
            if(user.admin){
                req.user = user
                delete req.user.password
                next()
            }else{
                res.status(401)
                throw new Error('Unauthorized.This user is not an admin.')
            }

        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized.')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error ('Unauthorized. Token was not received')
    }
})

module.exports = {protect, protectAdmin}