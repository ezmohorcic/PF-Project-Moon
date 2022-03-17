import { Router, Request, Response} from 'express'
import {config} from 'dotenv';
const User = require('../models/User') 
const router = Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
config()

router.post('/', async (req:Request,res:Response) => {
    const { email } = req.body
    try {
        const user = await User.findOne({email})
        
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO)
        const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        const accessToken = jwt.sign({
            id: user._id
        },process.env.JWT_KEY,
        {expiresIn: '1d'}
        )
        
        const {...others} = user._doc


        !user || originPassword !== req.body.password
        ? res.status(404).json('Wrong credentials') 
        : res.json({...others,accessToken})
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports =  router;