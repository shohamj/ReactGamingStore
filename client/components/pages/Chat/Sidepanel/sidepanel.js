import React from 'react';
import {observer} from "mobx-react"
import Contact from './contact.js'

@observer
export default class SidePanel extends React.Component {

    constructor(props) {
        super(props);
        this.onContactSearchChanged = this.onContactSearchChanged.bind(this);
    }
    
    onContactSearchChanged(e){
        this.props.chatStore.searchContacts = e.target.value;
    }

    render() {
      return (
        <div id="sidepanel">
          <div id="profile">
            <div className="wrap">
              <img id="profile-img" src={this.props.chatStore.user.image} className="online" alt="" />
              <p>{this.props.chatStore.user.name}</p>   
            </div>
          </div>
          <div id="search">
            <label><i className="fa fa-search" aria-hidden="true" /></label>
            <input type="text" placeholder="Search contacts..." value={this.props.chatStore.searchContacts} onChange={this.onContactSearchChanged} />
          </div>
          <div id="contacts">
            <ul>
              {this.props.chatStore.filteredUsers.map((user, index) => {
                  return  <Contact key={index}
                  name={user.name} 
                  isOnline={user.isOnline}
                  isActive={this.props.chatStore.active.type == "user" && this.props.chatStore.active._id == user._id}
                  image={user.image}
                  lastMsg={this.props.chatStore.getLastMessage("user", user._id)}
                  type="user"
                  id={user._id}
                  chatStore={this.props.chatStore}
                  />
              })}
              {this.props.chatStore.filteredGroups.map((group, index) => {
                  return  <Contact key={index}
                  name={group.name} 
                  isOnline={true}
                  isActive={this.props.chatStore.active.type == "group" && this.props.chatStore.active._id == group._id}
                  image={group.image}
                  lastMsg={this.props.chatStore.getLastMessage("group",group._id)}
                  type="group"
                  id={group._id}
                  chatStore={this.props.chatStore}
                  />
              })}
            </ul> 
          </div>
        </div>
        );
    }
}
