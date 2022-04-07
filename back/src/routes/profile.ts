import { Router, Request, Response } from 'express'
const User = require('../models/User')
const Post = require('../models/Post')
const router = Router()

//Muestra los post hehcos y compartidos de un usuario
router.get('/:idUser/:idCurrentUser', async(req:Request, res:Response) => {
    const { idUser, idCurrentUser } = req.params
    const { page = 1 }: { page?: number } = req.query;
    try {
        const user = await User.findById(idUser)

        let posts = await Post.find({ user: idUser})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})

        // posts = posts.filter((post: any) => !post.share && post.user._id === user._id)
        
        let shares = await Post.find({ shareUser: idUser})
        .populate('user',{username: 1, profilePhoto:1})
        .populate('likes',{username: 1, profilePhoto:1})
        .populate({ path:'comments', populate: { path: 'user', model:'User', select: 'username profilePhoto'}})
        .populate('shares',{username: 1, profilePhoto:1})
        .populate('shareUser',{username: 1, profilePhoto:1})
        .populate('soldUser',{username: 1, profilePhoto:1})
        
        let profile = posts.concat(shares).sort((a:any, b:any) => {
            if (a.createdAt < b.createdAt) return 1
            if (a.createdAt > b.createdAt) return -1
            return 0;
        })

        if(idUser !== idCurrentUser){ 
            if (!user.premium.includes(idCurrentUser)) profile = profile.filter((post: any) => !post.premium)
        }

        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = profile.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = profile.splice(0,20)
            res.json(postsShow)
        }
        res.json(profile)
    } catch (error) {
      console.log(error)
        res.status(500).json({error: error})
    }
})

router.get('/portfolio/:idUser/:idCurrentUser', async (req:Request, res:Response) => {
    const { idUser, idCurrentUser } = req.params
    const { page = 1 }: { page?: number } = req.query;
    
    try {
        const user = await User.findById(idUser)
        let posts = await Post.find({ user: idUser})
        // posts = posts.filter((post: any) => post.share)
        let portfolio:any = []

        if(idUser !== idCurrentUser){ 
            if (!user.premium.includes(idCurrentUser)) posts = posts.filter((post: any) => !post.premium)
        }

        posts.sort((function (a:any, b:any) {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        }))

        posts.map((post:any) => {
        if(post.images.length) {
            post.images.forEach((image:string, index:any) => {     
                portfolio.push({_id: post._id, image: post.images[index]})
            });
        }
        }) 
        if(page) {
            const lastPage = page * 20
            const firstPage = lastPage - 20
            const postsShow = portfolio.slice(firstPage, lastPage)
            return res.json(postsShow)
        } else {
            const postsShow = portfolio.splice(0,20)
            res.json(postsShow)
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({error: err})
    }
})

module.exports = router;