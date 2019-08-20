import React from 'react';
import {observer} from "mobx-react"
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-subway/like';
import unlikeIcon from '@iconify/icons-subway/unlike';
import ModalImage from "react-modal-image";
import Linkify from 'react-linkify';


@observer
export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    like(){
        var foundIndex = this.props.chatStore.messages.findIndex(x => x._id == this.props.id);
        this.props.chatStore.messages[foundIndex].isLiked = true;
        this.props.chatStore.messageLiked(this.props.id);
    }
    unlike(){
        var foundIndex = this.props.chatStore.messages.findIndex(x => x._id == this.props.id);
        this.props.chatStore.messages[foundIndex].isLiked = false;
        this.props.chatStore.messageUnliked(this.props.id);

    }
    
    render() {
        const {isMine, data, from, image,  date, isLiked, likes, unlikes, dataType} = this.props;
        const {activeInfo, user} = this.props.chatStore;
        return (
            <li className={isMine ? "sent" : "replies"}>
              <img className="avatar" src={image}  alt="" />
              <div className="data">
              
              {dataType=="text" && <Linkify> {data}</Linkify>}

              {dataType=="image" && <ModalImage className="image-data" style={{width: "100%"}} small={data} large={data}/>}

                <label className={isMine ? "sent" : "replies"}> {from + ' | ' +  date} </label>   
                <label className={isMine ? "sent" : "replies"}> {"Likes: " + likes + ' | ' +  "Unlikes: " + unlikes} </label>     
                <Icon height="20" width="20" onClick={this.like} icon={likeIcon} className={"like " + (isLiked==true ? "active" : "")}/>
                <Icon height="20" width="20" onClick={this.unlike} icon={unlikeIcon} className={"unlike " + (isLiked==false ? "active" : "")}/> 
              </div>
                  
            </li>
        );
    }
}
