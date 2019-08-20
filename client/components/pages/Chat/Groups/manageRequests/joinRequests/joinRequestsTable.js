import React from 'react';
import {observer} from "mobx-react";
import JoinRequestRow from "./joinRequestRow";
import {toJS} from "mobx"
import ReactLoading from "react-loading";


@observer
export default class JoinRequestsTable extends React.Component {
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
                            <h2>Join <b>Requests</b></h2>
                        </div>
                    </div>
                </div>
                {this.props.chatStore.loadingJoinRequests && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.chatStore.loadingJoinRequests && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>User Image</th>						
                            <th>User Name</th>						
                            <th>Group Name</th>
                            <th>Requested At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                 <tbody>
                 {this.props.chatStore.joinRequests.map((request, index) => {
                     return <JoinRequestRow request={request} index={index+1} key={index} chatStore={this.props.chatStore} authStore={this.props.authStore}/>
                    })}
                </tbody>
                </table>
                }
            </div>
        </div>   
        );
    }
}
