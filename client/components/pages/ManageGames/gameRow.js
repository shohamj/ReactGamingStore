import React from 'react';
import {observer} from "mobx-react";

import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-zmdi/edit';
import deleteIcon from '@iconify/icons-zmdi/delete';
import checkCircle from '@iconify/icons-zmdi/check-circle';
import closeCircle from '@iconify/icons-zmdi/close-circle';

import Select from 'react-select';

const genres = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Indie', label: 'Indie' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Racing', label: 'Racing' },
  { value: 'Sports', label: 'Sports' }
]

const platforms = [
  { value: 'PC', label: 'PC' },
  { value: 'Linux', label: 'Linux' },
  { value: 'MAC', label: 'MAC OSX' }
]

@observer
export default class GameRow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isEditing: false},
      this.deleteUser = this.deleteUser.bind(this);
      this.edit = this.edit.bind(this);
      this.cancel = this.cancel.bind(this);
      this.onRoleChange = this.onRoleChange.bind(this);
      this.updateUser = this.updateUser.bind(this);
    } 

    updateUser(){
      fetch('/api/users/updateUser', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.user._id, update:{role: this.state.role}}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      this.props.user.role = this.state.role;
      this.setState({isEditing: false});


    }
    onRoleChange(e){
      this.setState({role: e.value});
    }
    edit(){
      this.setState({isEditing: true, lastRole: this.state.role});
    }
    cancel(){
      this.setState({isEditing: false});
      this.setState({role: this.state.lastRole});

    }
    deleteUser(id){
      this.props.userStore.userForDelete = id;
      this.props.showDeleteDialog();
    }
    render() {
        const {mainImage, name, genre, released, added, platform, price,controller, _id} = this.props.game;
        console.log(genre);
        return (
          <tr>
          <td>{this.props.index}</td>
          <td><img width="150px" src={"images/games/" + mainImage}/></td>
          <td >{name}</td>
          <td style={{width:"220px"}}><Select           
                 isMulti
                 isDisabled 
                 options={genres}
                 value={genres.filter((elem) => genre.includes(elem.value))}
                 onChange={this.onRoleChange}
                 className="basic-multi-select"
                 classNamePrefix="select"
            /></td>
          <td>{released.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td>{added.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td>${price}</td>
          <td>{controller?"Supported":"Not supported"}</td>     
          <td style={{width:"200px"}}><Select           
                 isMulti
                 isDisabled 
                 options={platforms}
                 value={platforms.filter((elem) => platform.includes(elem.value))}
                 onChange={this.onRoleChange}
                 className="basic-multi-select"
                 classNamePrefix="select"
          /></td>        
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
