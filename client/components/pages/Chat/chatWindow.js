import React from 'react';
import {observer} from "mobx-react"

import PageBanner from "../Partials/pageBanner.js"
import SidePanel from './Sidepanel/sidepanel.js'
import Content from './Content/content.js'
import '../../../css/chat.css'

@observer
export default class ChatWindow extends React.Component {
    render() {

      return (
        <div id="frame">
        <SidePanel chatStore={this.props.chatStore}/>
        <Content chatStore={this.props.chatStore}/>
        </div>
      );
    }
}