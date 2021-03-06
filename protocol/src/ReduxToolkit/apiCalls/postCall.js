import "regenerator-runtime/runtime";
import axios from "axios";

import { setDetailedPost,setNewComment } from "../reducers/postSlice";
import { feedDatabase } from "../reducers/homeSlice";
import { SUCCESS_200 } from "../consts";
import { userPostsSuccess } from "../reducers/usersPosts";

export const getCategories = async (dispatch) => {
    var json = await axios.get('/api/categories')
    dispatch(json.data)
}

export const getDetailedPost = async (id,dispatch) => {
    const res = await axios.get(`/api/posts/${id}`);
    let out={};
    res.data.hasOwnProperty("_id") ? out=res.data : out={error:true};
    console.log(out);
    dispatch(setDetailedPost(out));
}

export const postPost = async (dispatch, userId, input, token, feed) => {
    try {
        let arrFeed=[...feed.posts];
        const res = await axios.post(`/api/posts/${userId}`,input, {
            headers: {
                token
            }
        })
        console.log(res)
        arrFeed.unshift(res.data);
        dispatch(feedDatabase({status:feed.status, posts: arrFeed}));
    } catch (error) {
        console.log(error)
    }

}
export const deletePost=async(dispatch, postId, token, postArray, father)=>{
    try {
        let pos = postArray.indexOf(postArray.filter(post=>post._id===postId)[0]);
        await axios.delete(`/api/posts/${postId}`, { headers:{token}})
        let newArr=[...postArray];
        newArr.splice(pos,1)
        father==="Feed" && dispatch(feedDatabase({status:SUCCESS_200, posts:newArr }))
        father==="UserPost" && dispatch(userPostsSuccess(newArr))
    } catch (err) {
        console.log(err)
    }
}

export const sendBackComment = async (id,comment,dispatch,localComment) => {
    try {
        const res = await axios.put(`/api/posts/comment/${id} `, comment);
        dispatch(setNewComment(localComment))

    } catch (error) {
        console.log(error)
    }

}
