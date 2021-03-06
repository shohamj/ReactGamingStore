import React from 'react';
import {observer} from "mobx-react";

import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-zmdi/edit';
import deleteIcon from '@iconify/icons-zmdi/delete';
import checkCircle from '@iconify/icons-zmdi/check-circle';
import closeCircle from '@iconify/icons-zmdi/close-circle';

import Select from 'react-select';


@observer
export default class GroupRequestRow extends React.Component {
    constructor(props) {
      super(props);
      this.cancel = this.cancel.bind(this);
      this.accept = this.accept.bind(this);
    } 

    cancel(){
      var self = this;
      fetch('/api/chat/cancelGroupRequest', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.request._id}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => self.props.chatStore.groupRequestsChanged())
    }
    accept(){
      var self = this;
      fetch('/api/chat/acceptGroupRequest', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.request._id}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => self.props.chatStore.groupRequestsChanged())
      .then(() => self.props.chatStore.groupsChanged())

    }

    render() {
        const {image, name, managerName, managerUsername, requested, status} = this.props.request;
        const role = this.props.authStore.role;
        console.log("role: " + role);
        return (
          <tr>
          <td>{this.props.index}</td>
          <td><img width="150px" src={image}/></td>
          <td >{name}</td>
          <td >{managerUsername}</td>
          <td >{managerName}</td>
          <td>{requested.split('T')[0].split('-').reverse().join("/")}</td>                        
          {(role == "manager" && status == "Pending") && 
					<td>
          <button className="edit" title="Accept Order" onClick={this.accept}><Icon icon={checkCircle} color="#5cb85c" height="22" width="22" className="edit"/></button>
          <button  title="Cancel Order" onClick={this.cancel}><Icon icon={closeCircle} color="#d9534f" height="22" width="22" className="delete"/></button>
					</td>
          }
          {status != "Pending" && <td></td>}
          </tr>
          
      );
    }
}
