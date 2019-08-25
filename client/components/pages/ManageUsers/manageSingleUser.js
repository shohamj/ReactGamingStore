import React from 'react';
import {observer} from "mobx-react";

import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-zmdi/edit';
import deleteIcon from '@iconify/icons-zmdi/delete';
import checkCircle from '@iconify/icons-zmdi/check-circle';
import closeCircle from '@iconify/icons-zmdi/close-circle';

import Select from 'react-select';
const options = [
  { value: 'customer', label: 'customer' },
  { value: 'employee', label: 'employee' },
  { value: 'manager', label: 'manager' },
];

@observer
export default class ManageSingleUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isEditing: false ,role: this.props.user.role, lastRole: this.props.user.role, email:props.user.email, error:{}},
      this.deleteUser = this.deleteUser.bind(this);
      this.edit = this.edit.bind(this);
      this.cancel = this.cancel.bind(this);
      this.onRoleChange = this.onRoleChange.bind(this);
      this.onEmailChange = this.onEmailChange.bind(this);
      this.updateUser = this.updateUser.bind(this);
    } 

    updateUser(){
      if(this.state.email == ''){
        this.setState({error:{email: "Can't be empty"}});
        return;
      }
      fetch('/api/users/updateUser', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.user._id, update:{role: this.state.role, email:this.state.email}}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      this.props.user.role = this.state.role;
      this.setState({isEditing: false, error:{}});


    }
    onRoleChange(e){
      this.setState({role: e.value});
    }
    onEmailChange(e){
      this.setState({email: e.target.value});
    }
    edit(){
      this.setState({isEditing: true, lastRole: this.state.role});
    }
    cancel(){
      this.setState({isEditing: false});
      this.setState({role: this.state.lastRole,email:this.props.user.email, error:{}});

    }
    deleteUser(id){
      this.props.userStore.userForDelete = id;
      this.props.showDeleteDialog();
    }
    render() {
        console.log(this.state.email);
        const {username, email, role,joined, games_bought, money_spent, _id} = this.props.user;
        console.log("***",this.props.user);
        return (
          <tr  >
          <td>{this.props.index}</td>
          <td>{username}</td>
          {!this.state.isEditing &&   
          <td>{email}</td>
          }
          {this.state.isEditing &&  
            <td>
              <input type="text" className={"bor8 form-control " + (this.state.error.email?"is-invalid":"")} value={this.state.email} onChange={this.onEmailChange}/>
              {this.state.error.email && ( <small className="form-text small-helper text-danger">{this.state.error.email}</small>)}               
            </td> 
          }
          <td>{joined.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td>{games_bought}</td>                        
          <td>${money_spent}</td>                        
          <td style={{width:"170px", height:"10px"}}>{this.state.isEditing ? <Select 
                 options={options}
                 value={{ label: this.state.role, value: this.state.role }}
                 onChange={this.onRoleChange}
            /> : this.state.role}</td>
          {!this.state.isEditing &&   
					<td>
          <button className="edit" title="Edit" onClick={this.edit}><Icon icon={editIcon} color="#428bca" height="20" width="20" className="edit"/></button>
          <button  title="Delete" onClick={() => this.deleteUser(_id)}><Icon icon={deleteIcon} color="#d9534f" height="20" width="20" className="delete"/></button>
					</td>
          }
          {this.state.isEditing &&   
					<td>
          <button className="edit" title="Update" onClick={this.updateUser}><Icon icon={checkCircle} color="#5cb85c" height="22" width="22" className="edit"/></button>
          <button  title="Cancel" onClick={this.cancel}><Icon icon={closeCircle} color="#d9534f" height="22" width="22" className="delete"/></button>
					</td>
          }
          </tr>
          
      );
    }
}
