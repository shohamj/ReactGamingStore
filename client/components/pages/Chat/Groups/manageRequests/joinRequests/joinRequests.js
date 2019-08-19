import React from 'react';
import {observer} from "mobx-react";
import JoinRequestsTable from "./joinRequestsTable"
import "../../../../../../css/mangmentTables.css"

@observer
export default class JoinRequests extends React.Component {
    
    componentDidMount(){
        this.props.chatStore.pullJoinRequests();
    }

    render() {  
        return (
          <JoinRequestsTable chatStore={this.props.chatStore} authStore={this.props.authStore}/>
      );
    }
}
