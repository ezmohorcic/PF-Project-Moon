import {Router, Request, Response} from 'express'

const router = Router()
const Post = require('../models/Post')

import {verifyToken} from '../helpers/verifyToken'

//Create Post
router.post('/',verifyToken ,async (req:Request, res:Response) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Like / dislike a post
router.put('/:id/like', async (req:Request, res:Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId}})
        res.status(200).json("The post has been liked")
        }else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports =  router;