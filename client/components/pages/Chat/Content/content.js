import React from 'react';
import {observer} from "mobx-react"
import Message from './message.js'
import { animateScroll } from "react-scroll";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



@observer
export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.onMessageSearchChanged = this.onMessageSearchChanged.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onTextMessageChange = this.onTextMessageChange.bind(this);
        this.notMember = this.notMember.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
        this.sendImage = this.sendImage.bind(this);
        this.setDates = this.setDates.bind(this);
        this.setFocusedInput = this.setFocusedInput.bind(this);
        this.setShowLater = this.setShowLater.bind(this);
        this.loadMoreMessages = this.loadMoreMessages.bind(this);
    }
    loadMoreMessages(){
      this.props.chatStore.numberOfMessages += 20;
      this.props.chatStore.pullMessages(true);
      
    }
    setFocusedInput(focusedInput){
      this.props.chatStore.focusedInput = focusedInput;
    }
    setDates({ startDate, endDate }){
      this.props.chatStore.startDate = startDate;
      this.props.chatStore.endDate = endDate;
    }
    sendMessage(){
      this.props.chatStore.sendTextMessage();
    }
    setShowLater(){
      this.props.chatStore.showLater=!this.props.chatStore.showLater;
    }
    chooseImage(){
      this.fileInput.click();
    }
    sendImage(e){
      var form_data = new FormData();
      var self = this;
      form_data.append("image",e.target.files[0]);
      fetch('/api/chat/uploadImage', {
          method: 'POST', 
          body: form_data, 
      })
      .then(res =>res.text())
      .then(res => self.props.chatStore.sendImageMessage(res))
    }
    onTextMessageChange(e){
      this.props.chatStore.textMessage = e.target.value;
    }
    onMessageSearchChanged(e){
        this.props.chatStore.searchMessages = e.target.value;
    }
    componentDidUpdate(){
      this.notMember();
      if (this.props.chatStore.shouldScroll)
        animateScroll.scrollToBottom({
          containerId: "messages",
          duration:200
        });
      this.props.chatStore.shouldScroll = false;
    }
    componentDidMount(){
      this.notMember();
      animateScroll.scrollToBottom({
        containerId: "messages",
        duration:200
      });
    }
    notMember(){
      if (this.props.chatStore.active.type == "group" && !this.props.chatStore.activeInfo.isMember)
      confirmAlert({
        title: 'Not a group member!',
        message: "You are not a member of this group. In order to receive and send message to this group, you must request to join it first.",
        buttons: [
          {
            label: 'Request Join',
            onClick: () => fetch('/api/chat/requestJoin', {
              method: 'POST', 
              body: JSON.stringify({id: this.props.chatStore.active._id}), 
              headers:{
                'Content-Type': 'application/json'
              }
            })
          },
          {
            label: 'Cancel',
            onClick: undefined
          },
        ]
      })
    }
    render() {
        const {active, activeInfo, user, startDate, endDate, focusedInput, showLater} = this.props.chatStore; 
        return (
          <div className="content">
            <div className="contact-profile">
              <img src={activeInfo.image} id={activeInfo.isOnline != false?"activeOnlineImg": "activeOfflineImg"} alt="" />
              <p>{activeInfo.name}</p>
            </div>
            <div className="row blend_bg" style={{margin: "0px"}}>
              <div id="searchMsg" className="col-8">
                  <label ><i className="fa fa-search" aria-hidden="true" /></label>
                  <input type="text" placeholder="Search messages..." value={this.props.chatStore.searchMessages} onChange={this.onMessageSearchChanged} />
              </div>
              <div className="col-4">
                <DateRangePicker
                  isOutsideRange={() => false}
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={this.setDates} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={this.setFocusedInput} // PropTypes.func.isRequired,
                />
              </div>
            </div>
            
            <div id="messages" className="messages">
            {(this.props.chatStore.active.type == "group" && !this.props.chatStore.activeInfo.isMember) &&
            <h1 className="my_center">Not a member</h1>
            }

              <ul>
                {this.props.chatStore.filteredMessages.map((message, index) => {
                    return  <Message key={index} 
                    isMine={message.from == user._id} 
                    data={message.data} 
                    date={message.date} 
                    from={this.props.chatStore.getNameById(message.from)} 
                    image={message.from == user._id ? user.image : this.props.chatStore.getImageById(message.from)}
                    isLiked={message.isLiked}
                    id={message._id}
                    dataType={message.dataType}
                    likes={message.likes}
                    unlikes={message.unlikes}
                    chatStore={this.props.chatStore}/>
                })}
              </ul>
            </div>
            <input ref={fileInput => this.fileInput = fileInput} type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.sendImage} hidden/>
            {(this.props.chatStore.active._id == "everyone" || this.props.chatStore.active.type == "user" || this.props.chatStore.activeInfo.isMember ) && <div className="message-input">
              <div className="wrap">
                <input type="text" placeholder="Write your message..." value={this.props.chatStore.textMessage} onChange={this.onTextMessageChange}/>
                <i className="fa fa-paperclip attachment" onClick={this.chooseImage} aria-hidden="true" />
                <button className="submit" onClick={this.sendMessage}><i className="fa fa-paper-plane" aria-hidden="true" /></button>
                <button className={"submit " + (showLater ? "": "clicked")} onClick={this.setShowLater}><i className="fa fa-eye" aria-hidden="true" /></button>
              </div>
            </div>}
            {(this.props.chatStore.active._id == "all messages" && this.props.chatStore.active.type == "all") && 
            <div className="message-input">
              <div className="wrap">
                <button className="full" onClick={this.loadMoreMessages}>Load more messages...</button>
              </div>
          </div>
            }
          </div>
        );
    }
}
