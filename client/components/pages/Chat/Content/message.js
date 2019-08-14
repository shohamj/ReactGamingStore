import React from 'react';
import {observer} from "mobx-react"
import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-subway/like';
import unlikeIcon from '@iconify/icons-subway/unlike';

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
    }
    unlike(){
        var foundIndex = this.props.chatStore.messages.findIndex(x => x._id == this.props.id);
        this.props.chatStore.messages[foundIndex].isLiked = false;
    }

    render() {
        const {isMine, data, from, image,  at, isLiked} = this.props;
        const {activeInfo, user} = this.props.chatStore;
        return (
            <li className={isMine ? "sent" : "replies"}>
              <img src={image}  alt="" />
              <div className="data">
              {data}     
              <label className={isMine ? "sent" : "replies"}> {from + ' | ' +  at} </label>     
                <Icon height="20" width="20" onClick={this.like} icon={likeIcon} className={"like " + (isLiked==true ? "active" : "")}/>
                <Icon height="20" width="20" onClick={this.unlike} icon={unlikeIcon} className={"unlike " + (isLiked==false ? "active" : "")}/> 
              </div>                  
            </li>
        );
    }
}
