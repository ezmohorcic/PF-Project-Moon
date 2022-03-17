import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { getFollowers, getFollowing } from "../redux/actions/Follows.js";
import { useDispatch, useSelector } from "react-redux";

/* const following = [{user: "alejo"},{user: "other"}]
const followers = [{user: "jesus"},{user: "other"}] */

export default function Follows(){
    const {user} = useParams()
    const dispatch = useDispatch()
    const status = useSelector ((state) => state.Status)
    const followingg = useSelector ((state) => state.Following)
    const followerss = useSelector ((state) => state.Followers)
    useEffect (() => {
        dispatch(getFollowers(user))
        dispatch(getFollowing(user))
    },[])

    const following = [{user: "alejo"},{user: "other"},{user: "other"}]
    const followers = [{user: "jesus"},{user: "other"}]

    const URL = useLocation();
    let displaying = following;
    if(URL.pathname.includes("followers")) displaying = followers;

    return(
        <div>
            <Link to={`/${user}/following`}>following</Link>
            <Link to={`/${user}/followers`}>followers</Link>
            <div>
                {displaying? displaying.map((e) => {
                    return (
                        <Link to={`/${e.user}`}>{e.user}</Link>
                    )
                }): null}
            </div>
        </div>
    )
}