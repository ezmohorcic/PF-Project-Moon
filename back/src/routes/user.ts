import { error } from 'console'
import { Router, Request, Response } from 'express'
import { verifyToken } from '../helpers/verifyToken'
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')


// Editar usuario
router.put('/:id',verifyToken, async (req:Request,res:Response) => {
    const { password } = req.body
    if(password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.HASH_CRYPTO
        ).toString()
    }
    try {
        const putUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        )
        res.json(putUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

//Follower and Following
router.put('/:id/follow', async (req: Request, res: Response) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            console.log(currentUser)
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({$push: {following: req.params.id}})
                res.status(200).json('Esta siguiendo a este usuario')
            }else {
                res.status(404).json(error)
            }
        } catch (error){
            res.status(500).json(error)
        }

    } else{
        res.status(403).json('No te podes seguir a vos mismo')
    }
})

// router.put('/follow/:Id',verifyToken, async (req:Request,res:Response) => {
//     const { password } = req.body
//     if(password){
//         req.body.password = CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.HASH_CRYPTO
//         ).toString()
//     }
//     try {
//         const putUser = await User.findByIdAndUpdate(
//             req.params.id, 
//             {
//                 $set: req.body
//             },
//             { new: true }
//         )
//         res.json(putUser)
//     } catch (error) {
//         res.status(404).json(error)
//     }
// })

// // Follow
// router.put('/follow/:Id', verifyToken, async (req:Request,res:Response) => {
//     const { id } = req.params
//     const user = await User.findbyid(id)
//     try {
//         await User.push(user)
//         res.json('New Follow')
//     } catch (error) {
//         res.status(404).json(error)
//     }
// })

// Borrar usuario
router.delete('/:id', verifyToken, async (req:Request,res:Response) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.json('The user has been deleted :C...')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;