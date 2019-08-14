import React from 'react';
import {observer} from "mobx-react"
import Message from './message.js'

@observer
export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.onMessageSearchChanged = this.onMessageSearchChanged.bind(this);
    }


    onMessageSearchChanged(e){
        this.props.chatStore.searchMessages = e.target.value;
    }

    render() {
        const {active, activeInfo, user} = this.props.chatStore;
        return (
          <div className="content">
            <div className="contact-profile">
              <img src={activeInfo.image} alt="" />
              <p>{activeInfo.name}</p>
            </div>
            <div id="searchMsg">
                <label ><i className="fa fa-search" aria-hidden="true" /></label>
                <input type="text" placeholder="Search messages..." value={this.props.chatStore.searchMessages} onChange={this.onMessageSearchChanged} />
            </div>
            <div className="messages">
              <ul>
                {this.props.chatStore.filteredMessages.map((message, index) => {
                    return  <Message key={index} 
                    isMine={message.from == user._id} 
                    data={message.data} 
                    at={message.at} 
                    from={this.props.chatStore.getNameById(message.from)} 
                    image={message.from == user._id ? user.image : this.props.chatStore.getImageById(message.from)}
                    isLiked={message.isLiked}
                    id={message._id}
                    type={message.type}
                    chatStore={this.props.chatStore}/>
                })}
              </ul>
            </div>
            <div className="message-input">
              <div className="wrap">
                <input type="text" placeholder="Write your message..." />
                <i className="fa fa-paperclip attachment" aria-hidden="true" />
                <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        );
    }
}
