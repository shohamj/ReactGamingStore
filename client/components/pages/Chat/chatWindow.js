import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";

import PageBanner from "../Partials/pageBanner.js"
import SidePanel from './Sidepanel/sidepanel.js'
import Content from './Content/content.js'
import '../../../css/chat.css'

@observer
export default class ChatWindow extends React.Component {
    componentDidMount(){
      this.props.chatStore.pullUsers();
      this.props.chatStore.pullGroups();
      this.props.chatStore.pullMessages();
    }
    render() {
      const {loading, loadingUsers, loadingGroups, loadingMessages} = this.props.chatStore;
      if (loading || loadingUsers || loadingGroups || loadingMessages)
        return (<div className="m-t-50"><ReactLoading type={"spin"} className="center" color={"#428bca"} height={70} width={70} /></div>);
      else return (
        <div id="frame">
        <SidePanel chatStore={this.props.chatStore}/>
        <Content chatStore={this.props.chatStore}/>
        </div>
      );
    }
}
