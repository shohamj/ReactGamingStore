import React from 'react';
import {observer} from "mobx-react";
import ManageSingleUser from "./manageSingleUser";
import ManageUserBottom from "./ManagmentUserBottom"
import UserDetails from "./userDetails.js"
import { Icon, InlineIcon } from '@iconify/react';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import searchIcon from '@iconify/icons-fa-solid/search';
import redoIcon from '@iconify/icons-fa-solid/redo';
import {toJS} from "mobx"
import ReactLoading from "react-loading";
import SkyLight from 'react-skylight';
import CustomScroll from 'react-custom-scroll';

var dialog = {
    height: '80%',
    overflowY: "auto",
    overflowX: "hidden"
};

@observer
export default class ManageUsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(e){
        this.props.userStore.search = e.target.value;
    }
    reload(){
        this.props.userStore.getUsers();
    }
    deleteUser(){
        this.props.userStore.deleteUser();
        this.props.userStore.getUsers();
        this.deleteUserDialog.hide();
    }
    render() {
        const pageUsers = toJS(this.props.userStore.pageUsers);
        const currentpage = toJS(this.props.userStore.currentpage);
        return (
            <div className="container">
            <div>
                <SkyLight dialogStyles={dialog} hideOnOverlayClicked ref={ref => this.addUserDialog = ref} >
                    <CustomScroll>
                        <UserDetails title="Add User"/>
                    </CustomScroll>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.deleteUserDialog = ref} >
                    <h4 className="mtext-105 cl2 txt-center p-b-10">Delete User</h4>
                    <div className="m-t-100">
                    <p className="mtext-106 cl2 txt-center p-b-10 ">Are you sure you want to delete user?</p>
                    <button onClick={this.deleteUser} className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn4 p-lr-15 trans-04 pointer">
                        Delete User
                    </button> 
                    </div>
                </SkyLight>
            </div>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>User <b>Management</b></h2>
                        </div>
                        <div className="col-sm-7">
                            <button className="btn btn-primary" style={{height:"35px", width:"132px"}} onClick={() => this.addUserDialog.show()}><i className="material-icons"><Icon className="material-icons" icon={userPlus} height="20" width="20" /></i> <span>Add New User</span></button>
                            <button className="btn btn-primary" style={{height:"35px", width:"132px"}} onClick={this.reload}><i className="material-icons"><Icon className="material-icons" icon={redoIcon} height="20" width="20" /></i> <span>Reload Users</span></button>
                            <div    className="btn btn-primary" style={{height:"35px"}}><i className="material-icons"><Icon className="material-icons" icon={searchIcon} height="20" width="20" /></i> <input type="text" placeholder="Search..." value={this.props.userStore.search} onChange={this.onSearchChange} style={{background:"transparent"}}></input></div>
                        </div>
                    </div>
                </div>
                {this.props.userStore.loading && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.userStore.loading && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>						
                            <th>Joined</th>
                            <th>Games Bought</th>
                            <th>Money Spent</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                 <tbody>
                 {pageUsers.map((user, index) => {
                     return <ManageSingleUser user={user} index={index+(currentpage-1)*5 + 1} key={user._id} showDeleteDialog={() => this.deleteUserDialog.show()} userStore={this.props.userStore}/>
                    })}
                </tbody>
                </table>
                }
                <ManageUserBottom userStore={this.props.userStore}/>
            </div>
        </div>   
        );
    }
}
