import React from 'react';
import {observer} from "mobx-react"
import CreateUser from './createUser'
import ChatWindow from './chatWindow'
import ReactLoading from "react-loading";

@observer
export default class Chat extends React.Component {
    componentDidMount(){
      this.props.chatStore.pullUser();
      this.props.chatStore.pullUsers();
      this.props.chatStore.pullGroups();
      this.props.chatStore.pullMessages();
    }
    render() {
      const {loading, loadingUsers, loadingGroups, loadingMessages} = this.props.chatStore;
      if (loading || loadingUsers || loadingGroups || loadingMessages)
        return (<ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70} />);
      else if(this.props.chatStore.user != undefined)
        return (<ChatWindow chatStore={this.props.chatStore}/>);
      else
        return (<CreateUser chatStore={this.props.chatStore}/>);
    }
}
