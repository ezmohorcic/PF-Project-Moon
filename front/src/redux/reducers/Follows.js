import { GET_FOLLOWING, GET_FOLLOWERS} from "../consts.js";

const initialState = {
    Status: "",
    Followers: [],
    Following: [],
};

export default function (state = initialState, action){
    switch(action.type) {
        case GET_FOLLOWING:
            return {
                ...state,
                Status: action.status,
                Following: action.payload,
            }
        case GET_FOLLOWERS:
            return {
                ...state,
                Status: action.status,
                Followers: action.payload,
            }
        default:
            return state;
    }
};