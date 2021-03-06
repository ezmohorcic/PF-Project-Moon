import { Router, Request, Response} from 'express'
const User = require('../models/User') 
const router = Router()
const CryptoJS = require('crypto-js')


router.post('/', async (req:Request,res:Response) => {
    const { email, password, favouritesCategories } = req.body

    const newUser = new User({
        email,
        password: CryptoJS.AES.encrypt(password,process.env.HASH_CRYPTO).toString(),
        username: email.split('@')[0],
        favouritesCategories
    })
    
    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;