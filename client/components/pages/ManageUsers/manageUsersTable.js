import React from 'react';
import {observer} from "mobx-react";
import ManageSingleUser from "./manageSingleUser";
import ManageUserBottom from "./ManagmentUserBottom"
import { Icon, InlineIcon } from '@iconify/react';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import arrowReload from '@iconify/icons-si-glyph/arrow-reload';@observer
export default class ManageUsersTable extends React.Component {
    render() {
        const users = this.props.users;
        return (
            <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>User <b>Management</b></h2>
                        </div>
                        <div className="col-sm-7">
                            <button className="btn btn-primary"><i className="material-icons"><Icon className="material-icons" icon={userPlus} height="20" width="20" /></i> <span>Add New User</span></button>
                            <button className="btn btn-primary"><i className="material-icons"><Icon className="material-icons" icon={arrowReload} height="20" width="20" /></i> <span>Reload Users</span></button>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserName</th>
                            <th>Email</th>						
                            <th>Date Created</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                 <tbody>
                 {users.map((value, index) => {
                     return <ManageSingleUser user={value} index={index+1} key={index} />
                    })}
                </tbody>
                </table>
                <ManageUserBottom />
            </div>
        </div>   
        );
    }
}
