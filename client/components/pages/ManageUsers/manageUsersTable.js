import React from 'react';
import {observer} from "mobx-react";
import ManageSingleUser from "./manageSingleUser";
import ManageUserBottom from "./ManagmentUserBottom"
import UserDetails from "./userDetails.js"
import { Icon, InlineIcon } from '@iconify/react';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import arrowReload from '@iconify/icons-si-glyph/arrow-reload';
import {toJS} from "mobx"
import ReactLoading from "react-loading";
import SkyLight from 'react-skylight';
import CustomScroll from 'react-custom-scroll';


@observer
export default class ManageUsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
    }
    reload(){
        this.props.userStore.getUsers();
    }
    render() {
        const pageUsers = toJS(this.props.userStore.pageUsers);
        const currentpage = toJS(this.props.userStore.currentpage);
        return (
            <div className="container">
             <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref}>
                <CustomScroll>
                    <UserDetails signupStore={this.props.signupStore} signinStore={this.props.signinStore} title="Add User"/>
                </CustomScroll>
            </SkyLight>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>User <b>Management</b></h2>
                        </div>
                        <div className="col-sm-7">
                            <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}><i className="material-icons"><Icon className="material-icons" icon={userPlus} height="20" width="20" /></i> <span>Add New User</span></button>
                            <button className="btn btn-primary" onClick={this.reload}><i className="material-icons"><Icon className="material-icons" icon={arrowReload} height="20" width="20" /></i> <span>Reload Users</span></button>
                        </div>
                    </div>
                </div>
                {this.props.userStore.loading && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.userStore.loading && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>						
                            <th>Joined</th>
                            <th>Games Bought</th>
                            <th>Money Spent</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                 <tbody>
                 {pageUsers.map((value, index) => {
                     return <ManageSingleUser user={value} index={index+(currentpage-1)*5 + 1} key={index} />
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
