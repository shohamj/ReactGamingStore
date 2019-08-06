import React from 'react';
import {observer} from "mobx-react";


@observer
export default class ManageSingleUser extends React.Component {
    
    render() {
        const user = this.props.user;
        const index = this.props.index;
        console.log("***",user);
        return (
          <tr>
          <td>{index}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>04/10/2013</td>                        
          <td>{user.role}</td>
					<td><span class="status text-success">&bull;</span> Active</td>
					<td>
						<a href="#" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons">&#xE8B8;</i></a>
						<a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a>
					</td>
          </tr>
      );
    }
}
