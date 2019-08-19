import React from 'react';
import {observer} from "mobx-react";
import GroupRequestRow from "./groupRequestRow";
import {toJS} from "mobx"
import ReactLoading from "react-loading";


@observer
export default class GroupRequestsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const role = this.props.authStore.role;
        return (
            <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>Group <b>Requests</b></h2>
                        </div>
                    </div>
                </div>
                {this.props.chatStore.loadingGroupsRequests && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.chatStore.loadingGroupsRequests && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>						
                            <th>Group Name</th>						
                            <th>Manager Name</th>
                            <th>Manager Username</th>
                            <th>Requested At</th>
                            {role == "manager" && <th>Actions</th>}  
                        </tr>
                    </thead>
                 <tbody>
                 {this.props.chatStore.groupRequests.map((request, index) => {
                     return <GroupRequestRow request={request} index={index+1} key={index} chatStore={this.props.chatStore} authStore={this.props.authStore}/>
                    })}
                </tbody>
                </table>
                }
            </div>
        </div>   
        );
    }
}
