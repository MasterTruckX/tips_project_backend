const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createDate = asyncHandler(
    async(req,res)=>{
        const dates = await prisma.date.create({
            data: {
                date: (new Date(req.body.date)).toJSON(),
                role: req.body.role,
                hours: +req.body.hours,
                shift: req.body.shift,
                user_id: req.user.id
            }
        })
        if (dates){
            res.status(201).json({
                message: `Date ${dates.date.toJSON()} created.`,
                date: dates.date,
                role: dates.role,
                hours: dates.hours,
                shift: dates.shift,
                id: dates.id
            })
        } else{
            res.status(400)
            throw new Error('Date was not created.')
        }
    }
)

const getAllDates = asyncHandler(
    async(req,res)=>{
        const user = await prisma.user.findUnique({
            where: {id: req.user.id}
        })
        if(user){
            try{
                const dates = await prisma.date.findMany({
                    where: {
                        user_id: req.user.id
                    }
                })
                res.status(200).json(dates)
            }catch{
                res.status(404)
                throw new Error('This user does not have any registered dates.')
            }
        }else{
            res.status(404)
            throw new Error('This user does not exist.')
        }
    }
)

const getDate = asyncHandler(
    async(req,res) =>{
        const dates = await prisma.date.findUnique({
            where: {id: +req.params.id} 
        })
        if(dates){
            res.status(200).json(dates)
        }else{
            res.status(404)
            throw new Error('This user does not have this date registered.')
        }
    }
)

const updateDate = asyncHandler(
    async(req,res) =>{
        try{
            const updatedDate = await prisma.date.update({
                where: {
                    id: +req.params.id
                },
                data: {
                    role: req.body.role,
                    hours: +req.body.hours,
                    shift: req.body.shift,
                }
            })
            res.status(200).json({message: `Date ${updatedDate.date} has been updated.`})
        }catch{
            res.status(404)
            throw new Error('This user does not have this date registered.')
        }
    }
)
const deleteDate = asyncHandler(
    async(req,res)=> {
        try{
            const date = await prisma.date.delete({
                where: {
                    id: +req.params.id
                }
            })
            res.status(200).json({message: `Date ${date.date} has been deleted.`})
        }catch{
            res.status(404)
            throw new Error('This user does not have this date registered.')
        }
    }
)

module.exports = {
    createDate,
    getAllDates,
    getDate,
    updateDate,
    deleteDate
};