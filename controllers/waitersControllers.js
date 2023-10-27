const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createWaiter = asyncHandler(
    async(req,res)=>{
        try{
            const waiter = await prisma.waiter.create({
                data: {
                    name: req.body.name,
                    checkTip: +req.body.checkTip,
                    paidTip: +req.body.paidTip,
                    date_id: +req.body.id
                }
            })
            res.status(201).json({
                message: `Tip from ${waiter.name} was registered.`,
                name: req.body.name,
                checkTip: waiter.checkTip,
                paidTip: waiter.paidTip
            })
        }catch{
            res.status(400)
            throw new Error('Tip was not registered.')
        }
    }
)

const getAllWaiters = asyncHandler(
    async(req,res) => {
        const dateExists = await prisma.date.findUnique({
            where: {
                id:+req.body.id
            }
        })
        if(dateExists){
            const waiters = await prisma.waiter.findMany({
                where: {
                    date_id: dateExists.id
                }
            })
            let listWaiters = []
            waiters.forEach(t => {listWaiters.push(t)})
            if(listWaiters.length==0){
                res.status(400)
                throw new Error('This date does not have any tips registered.')    
            }else{
                res.status(200).json(waiters)
            }
        }else{
            res.status(400)
            throw new Error('This date does not have any tips registered.')
        }
    }
)

const getWaiter = asyncHandler(
    async(req,res) => {
        const dateExists = await prisma.date.findUnique({
            where: {id: +req.body.id}
        })
        if(dateExists){
            const waiter = await prisma.waiter.findFirst({
                where: {AND: [{name: req.body.name},{date_id: dateExists.id}]}
            })
            if(waiter){
                res.status(200).json(waiter)
            }else{
                res.status(400).json({message: 'Tip was not registered.'})
            }
        }else{
            res.status(400)
            throw new Error('This date does not have any tips registered.')
        }
    }
)

const updateWaiter = asyncHandler(
    async(req,res) => {
        const waiterExists = await prisma.waiter.findFirst({
            where: {AND: [{date_id: +req.body.id},{name: req.body.name}]}
        })
        if(waiterExists){
            const waiter = await prisma.waiter.update({
                where: {
                    id: waiterExists.id
                },
                data: {
                    checkTip: +req.body.checkTip,
                    paidTip: +req.body.paidTip
                }
            })
            res.status(200).json({ message: `Tip from ${waiterExists.name} has been updated.`})
        }else{
            res.status(400)
            throw new Error('Tip was not updated.')
        }
    }
)

const deleteWaiter = asyncHandler(
    async(req,res) => {
        const waiterExists = await prisma.waiter.findFirst({
            where: {AND: [{date_id: +req.body.id},{name: req.body.name}]}
        })
        if(waiterExists){
            const waiter = await prisma.waiter.delete({
                where: {
                    id: waiterExists.id
                }
            })
            res.status(200).json({message: `${waiter.name} has been deleted.`})
        }else{
            res.status(400)
            throw new Error('Waiter was not deleted.')
        }
    }
)


module.exports = {
    createWaiter,
    getAllWaiters,
    getWaiter,
    updateWaiter,
    deleteWaiter
}