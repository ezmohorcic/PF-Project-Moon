import SoldCss from "./Sold.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faFileAlt, faBarcode } from "@fortawesome/free-solid-svg-icons";


export default function Sold() {
    const [solds, setSolds] = useState([])
    const [page, setPage] = useState(1)
    const id = useSelector(state => state.userData.currentUser?._id)

    const getSolds = async (id) => {
        if(id) {
        const { data } = await axios.get(`/api/orders/solds/${id}?page=${page}`)
        console.log(data)
        setSolds([...data])
        }
    }

    const loadMore = (event) => {
        event.preventDefault()
        setPage(prev => prev++)
    }

    useEffect(()=>getSolds(id),[id, page])
    //{SoldCss.}
    return (
        <div id={SoldCss.soldCont}>
            { solds?.map(sold => {

                return (
                    <div className={SoldCss.wholeCont}>
                        <div className={SoldCss.sold}>
                            <div className={SoldCss.UserShell}>
                                <div className={SoldCss.imgShell}>
                                    <img className={SoldCss.img} src={sold.user.profilePhoto? sold.user.profilePhoto : defaultPhoto} />
                                </div>
                                <p className={SoldCss.userName}> {sold.user.username && sold.user.username} </p>
                            </div>

                            <div className={SoldCss.arrowShell}>
                                <FontAwesomeIcon icon={faAngleRight}/> {/*className={SoldCss.} */}
                                <p>Sold To</p>  
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </div>

                            <div className={SoldCss.UserShell}>
                                <div className={SoldCss.imgShell}>
                                    <img className={SoldCss.img} src={sold.to.profilePhoto? sold.to.profilePhoto : defaultPhoto} />
                                </div>
                                <p className={SoldCss.userName}>{sold.to.username && sold.to.username}</p>
                            </div>

                            <div className={SoldCss.ticketShell}>
                                <p className={SoldCss.amount}>Amount: <span>US${sold.amount && sold.amount}</span></p>
                                <a className={SoldCss.ticketBut} target="_blank" href={sold.ticket && sold.ticket}> <FontAwesomeIcon icon={faBarcode}/> Ticket </a>
                            </div>
                        </div>

                        <div className={SoldCss.purchasedShell}>
                            <img className={SoldCss.purchased} src={sold.post?.image? sold.post.image[0] : ""}/>
                        </div>

                    </div>

            )})}
                <button id={SoldCss.loadMoreBut} onClick={(event) => loadMore(event)}>ShowMore</button>
        </div>
    );
}