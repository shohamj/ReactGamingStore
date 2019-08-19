import React from 'react';
import {observer} from "mobx-react";
import GroupRequestsTable from "./groupRequestsTable"
import "../../../../../../css/mangmentTables.css"

@observer
export default class GroupRequests extends React.Component {
    
    componentDidMount(){
        this.props.chatStore.pullGroupsRequests();
    }

    render() {
        return (
          <GroupRequestsTable chatStore={this.props.chatStore} authStore={this.props.authStore}/>
      );
    }
}
