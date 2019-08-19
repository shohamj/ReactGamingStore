import React from 'react';
import {observer} from "mobx-react";
import GroupRequests from "./groupRequests/groupRequests.js"
import JoinRequests from "./joinRequests/joinRequests.js"

@observer
export default class ManageRequests extends React.Component {

    render() {
        return (
          <div>
            <GroupRequests chatStore={this.props.chatStore} authStore={this.props.authStore}/>
            <JoinRequests chatStore={this.props.chatStore} authStore={this.props.authStore}/>
          </div>
      );
    }
}
