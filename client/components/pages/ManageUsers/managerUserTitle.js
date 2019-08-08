import React from 'react';
import {observer} from "mobx-react";
import ManageSingleUser from "./manageSingleUser";
import ManageUserBottom from "./ManagmentUserBottom"

@observer
export default class ManageUsersTitle extends React.Component {
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
                            <a href="#" className="btn btn-primary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></a>
                            <a href="#" className="btn btn-primary"><i className="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>						
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
                     return <ManageSingleUser user={value} index={index+1} key={index}/>
                    })}
                </tbody>
                </table>
                <ManageUserBottom />
            </div>
        </div>   
        );
    }
}
