import React from 'react';
import {observer} from "mobx-react"
import CreateUser from './createUser'
import ChatWindow from './chatWindow'
import ReactLoading from "react-loading";

@observer
export default class Chat extends React.Component {
    componentDidMount(){
      this.props.chatStore.pullUser();
    }
    render() {
      const {loading, loadingUsers, loadingGroups, loadingMessages} = this.props.chatStore;
      if (loading)
        return (<div className="m-t-50"><ReactLoading type={"spin"} className="center" color={"#428bca"} height={70} width={70} /></div>);
      else if(this.props.chatStore.user != undefined)
        return (<ChatWindow chatStore={this.props.chatStore}/>);
      else
        return (<CreateUser chatStore={this.props.chatStore}/>);
    }
}
