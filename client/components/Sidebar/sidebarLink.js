import React from 'react';
import {observer} from "mobx-react";
import {NavLink} from 'react-router-dom'
import { Icon } from '@iconify/react';

@observer
export default class SidebarLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <li className="p-b-13">
              <NavLink to={this.props.to} className="stext-102 cl2 hov-cl1 trans-04 centered-label" onClick={this.props.onClick}>
                <Icon icon={this.props.icon} width="15" height="15"/>
                &nbsp;&nbsp;{this.props.text}
              </NavLink>
            </li>
          );
    }
}