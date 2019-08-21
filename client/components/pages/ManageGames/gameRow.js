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
					<td>
          <button  title="Delete" onClick={() => this.deleteGame(_id)}><Icon icon={deleteIcon} color="#d9534f" height="20" width="20" className="delete"/></button>
					</td>
          

          </tr>
          
      );
    }
}
