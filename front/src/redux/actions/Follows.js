import "regenerator-runtime/runtime";
const axios = require("axios");
import { GET_FOLLOWING, GET_FOLLOWERS} from "../consts.js";

export function getFollowers(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/${payload}/followers`);

        return dispatch({
            type: GET_FOLLOWERS,
            payload: json.data,
        })
    }
}

export function getFollowing(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/${payload}/following`);

        return dispatch({
            type: GET_FOLLOWING,
            payload: json.data,
        })
    }
}