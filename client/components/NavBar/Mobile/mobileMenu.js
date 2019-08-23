import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {observer} from "mobx-react"

import { Icon, InlineIcon } from '@iconify/react';
import shoppingCart from '@iconify/icons-zmdi/shopping-cart';
import accountIcon from '@iconify/icons-zmdi/account';
@observer
export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
   
  }


  render() {
    var showMobile = this.props.navbarStore.showMobileMenu;
    return (
        <div className="menu-mobile" style={showMobile?{display:"block"}:{display:"none"}}>
        <ul className="main-menu-m">
        <li>
                      <NavLink exact to="/" activeStyle={{color: "#0C5A81"}}>Home</NavLink>     
                    </li>
                    <li>
                        <NavLink to="/about" activeStyle={{color: "#0C5A81"}}>About</NavLink>     
                    </li>
                    <li>
                        <NavLink to="/contact" activeStyle={{color: "#0C5A81"}}>Contact</NavLink>     
                    </li>
                    <li>
                      <NavLink to="/shop" activeStyle={{color: "#0C5A81"}}>Shop</NavLink>
                    </li>     
                    <li>
                      <NavLink to="/chat" activeStyle={{color: "#0C5A81"}}>Chat</NavLink>
                      <ul className="sub-menu">
								      	<li><NavLink to="/chat">Chat Window</NavLink></li>
								      	<li><NavLink to="/chat/create_group">Create Group</NavLink></li>
								      	<li><NavLink to="/chat/groups_management">Management</NavLink></li>
								      </ul>
                    </li>
                    <li>
                        <NavLink to="/blog" activeStyle={{color: "#0C5A81"}}>Blog</NavLink>     
                    </li>
        </ul>
      </div>
       );
    }
}
