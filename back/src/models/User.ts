import {Schema,model} from 'mongoose'

export interface User {
    username?: string
    email: string
    password?: string
    image?: string
    followers?: number []
    following?: number []
    favourites?: number []
    history?: object []
}

const UserSchema = new Schema<User>(
    {
        username: {type:String},
        email: {type:String,unique:true},
        password: {type:String},//removed required cause when logging with Google/Microsoft no password is provided
        image: {type:String},
        followers: {type: []},
        following: {type: []},
        favourites: {type: []},
    },
    {timestamps:true}
    )

module.exports = model<User>('User', UserSchema)