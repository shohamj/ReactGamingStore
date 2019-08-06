import React from 'react';
import {observer} from "mobx-react";
import ManageSingleUser from "./manageSingleUser";

@observer
export default class ManageUsersTitle extends React.Component {
    render() {
        const users = this.props.users;
        return (
            <div class="container">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-5">
                            <h2>User <b>Management</b></h2>
                        </div>
                        <div class="col-sm-7">
                            <a href="#" class="btn btn-primary"><i class="material-icons">&#xE147;</i> <span>Add New User</span></a>
                            <a href="#" class="btn btn-primary"><i class="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>						
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
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
                     return <ManageSingleUser user={value} index={index+1} />
                    })}
                </tbody>
                </table>
            </div>
        </div>   
        );
    }
}
