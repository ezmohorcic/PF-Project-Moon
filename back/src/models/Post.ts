import {Schema,model} from 'mongoose'

export interface Post {
    userid: string
    image?: string
    description: string
    likes?: string []
    title?: string
    categories?: string []
    comments?: object []
    price?: string
    premium?: boolean
}

const UserSchema = new Schema<Post>(
    {
        userid: {type: String, required:true},
        image: {type:String},
        title: {type:String},
        likes: {type: []},
        description: {type: String, required:true},
        categories: {type: []},
        comments: {type: []},
        price: {type:String},
        premium: {type:Boolean},
        
    },
    {timestamps:true}
    )

module.exports = model<Post>('Post', UserSchema)