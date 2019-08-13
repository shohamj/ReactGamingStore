import React from 'react';
import {observer} from "mobx-react";

import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-zmdi/edit';
import deleteIcon from '@iconify/icons-zmdi/delete';
import checkCircle from '@iconify/icons-zmdi/check-circle';
import closeCircle from '@iconify/icons-zmdi/close-circle';

import Select from 'react-select';


@observer
export default class GameRow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isEditing: false},
      this.deleteGame = this.deleteGame.bind(this);
    } 

    edit(){
      this.setState({isEditing: true, lastRole: this.state.role});
    }
    cancel(){
      this.setState({isEditing: false});
      this.setState({role: this.state.lastRole});
    }
    deleteGame(id){
      this.props.gameStore.gameForDelete = id;
      this.props.showDeleteDialog();
    }
    render() {
        const {user, game, price, amount, total, ordered, status} = this.props.order;
        return (
          <tr>
          <td>{this.props.index}</td>
          <td >{user}</td>
          <td >{game}</td>
          <td >${price}</td>
          <td >{amount}</td>
          <td>{ordered.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td >${total}</td>
          <td >{status}</td>

          {!this.state.isEditing &&   
		<td>
          <button className="edit" title="Edit" onClick={this.edit}><Icon icon={editIcon} color="#428bca" height="20" width="20" className="edit"/></button>
          <button  title="Delete" onClick={() => this.deleteGame(_id)}><Icon icon={deleteIcon} color="#d9534f" height="20" width="20" className="delete"/></button>
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
