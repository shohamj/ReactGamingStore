import React from 'react';
import {observer} from "mobx-react"

@observer
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(){
        this.props.chatStore.active = {type: this.props.type, _id: this.props.id};
        this.props.chatStore.shouldScroll = true;
    }

    render() {
        const {name, lastMsg, image, isOnline, isActive} = this.props;
        return (
          <li className={"contact " + (isActive ? "active": "")} onClick={this.onClick}>
            <div className="wrap">
              <span className={"contact-status " + (isOnline ? "online": "offline")} />
              <img src={image} alt="" />
              <div className="meta">
                <p className="name">{name}</p>
                <p className="preview">{lastMsg}</p>
              </div>
            </div>
          </li>
        );
    }
}
