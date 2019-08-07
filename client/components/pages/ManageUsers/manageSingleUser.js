import React from 'react';
import {observer} from "mobx-react";


@observer
export default class ManageSingleUser extends React.Component {
    
    render() {
        const {username, email, role} = this.props.user;
        console.log("***",this.props.user);
        return (
          <tr>
          <td>{this.props.index}</td>
          <td>{username}</td>
          <td>{email}</td>
          <td>04/10/2013</td>                        
          <td>{role}</td>
					<td><span className="status text-success">&bull;</span> Active</td>
					<td>
						<a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
						<a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
					</td>
          </tr>
      );
    }
}
