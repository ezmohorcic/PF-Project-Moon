import { format } from "timeago.js";
import MessageCss from "./Message.module.css";
import defaultPhoto from '../assets/default_profile_photo.svg'

export default function Message({ message, own, image }) {
  return (
  <div className={own? MessageCss.messageCont : MessageCss.reverseMessageCont}>
    <div className={own ? MessageCss.messageOwn : MessageCss.message}>
      <div className={MessageCss.messageTop}>
        {/* <img className="messageImg"src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt=""/> */}

        <p className={MessageCss.messageText}>{message.text}</p>
      </div>
      
      <div className={MessageCss.TimeAgo}>{format(message.createdAt)}</div>
    </div>
    {own? <div className={MessageCss.decoOwn}></div> : <div className={MessageCss.decoNotOwn}></div>}
  </div>
  
  );
}
