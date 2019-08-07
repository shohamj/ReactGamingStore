import React from 'react';
import {observer} from "mobx-react";

import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-typcn/delete';
import editIcon from '@iconify/icons-zmdi/edit';

@observer
export default class ManageSingleUser extends React.Component {
    
    render() {
        const {username, email, role,joined, games_bought, money_spent} = this.props.user;
        console.log("***",this.props.user);
        return (
          <tr style={this.props.index%2 ? {background:"white"}: {}}>
          <td>{this.props.index}</td>
          <td>{username}</td>
          <td>{email}</td>
          <td>{joined.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td>{games_bought}</td>                        
          <td>${money_spent}</td>                        
          <td>{role}</td>
					<td>
          <button href="#" className="edit" title="Settings" data-toggle="tooltip"><Icon icon={editIcon} color="DodgerBlue" height="17" width="17" className="edit"/></button>
          <button href="#"  title="Delete" data-toggle="tooltip"><Icon icon={deleteIcon} color="red" height="27" width="27" className="delete"/></button>
					</td>
          </tr>
      );
    }
}
