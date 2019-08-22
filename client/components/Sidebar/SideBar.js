import React from 'react';
import {NavLink} from 'react-router-dom'
import {observer} from "mobx-react"
import { withRouter } from "react-router-dom";

import { Icon, InlineIcon } from '@iconify/react';
import accountIcon from '@iconify/icons-zmdi/account';
import formatListBulleted from '@iconify/icons-zmdi/format-list-bulleted';
import shoppingCart from '@iconify/icons-zmdi/shopping-cart';
import signOut from '@iconify/icons-gridicons/sign-out';
import SidebarLink from './sidebarLink.js'
import logoGameControllerB from '@iconify/icons-ion/logo-game-controller-b';
import userFriends from '@iconify/icons-fa-solid/user-friends';

@withRouter
@observer
export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  
  closeSidebar()
  {
    this.props.navbarStore.setShowSidebar(false);
  }
  onSignOut(){
    this.props.authStore.signOut();
    this.closeSidebar()
    this.props.history.push("/");
    this.props.chatStore.disconnect();
  }
  onOutsideClick(e){
    if (e.target.classList.contains("js-hide-sidebar")){
      this.closeSidebar()
    }
  }
  render() {
    const role = this.props.authStore.role;
    return (
      <aside className={"wrap-sidebar js-sidebar " + (this.props.navbarStore.showSidebar ? 'show-sidebar' : "")}  onClick={this.onOutsideClick}>
      <div className="s-full js-hide-sidebar"/>
      <div className="sidebar flex-col-l p-t-22 p-b-25" onClick={this.onClick}>
        <div className="flex-r w-full p-b-30 p-r-27">
          <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar" onClick={this.closeSidebar}>
            <i className="zmdi zmdi-close" />
          </div>
        </div>
        <div className="sidebar-content flex-w w-full p-lr-65 js-pscroll">
          <ul className="sidebar-link w-full">
            <li className="p-b-13">
              <h4 className="mtext-105 cl2">
                  {"Welcome " + this.props.authStore.currentUser + "!"}
              </h4>
              <br></br>
            </li>
              <SidebarLink to="/account" icon={accountIcon} text="My Account" onClick={this.closeSidebar}/>
              {role == "manager" && <SidebarLink to="/manage_users" icon={userFriends} text="Manage Users" onClick={this.closeSidebar}/>}
              {role == "employee" || role == "manager" && <SidebarLink to="/manage_games" icon={logoGameControllerB} text="Manage Games" onClick={this.closeSidebar}/>}
              <SidebarLink to="/cart" icon={shoppingCart} text="Cart" onClick={this.closeSidebar}/>
              <SidebarLink to="/orders" icon={formatListBulleted} text="Order History" onClick={this.closeSidebar}/>  
            <li className="p-b-13">
              <button className="stext-102 cl2 hov-cl1 trans-04 centered-label" onClick={this.onSignOut}>
                <Icon icon={signOut} width="15" height="15"/>
                &nbsp;&nbsp;Sign Out
              </button>
            </li>
          </ul>
          </div>
        </div>
    </aside>
    );
  }
}
