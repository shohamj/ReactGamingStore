import React from 'react';
import {NavLink} from 'react-router-dom'
import {observer} from "mobx-react"

import { Icon, InlineIcon } from '@iconify/react';
import shoppingCart from '@iconify/icons-zmdi/shopping-cart';
import searchIcon from '@iconify/icons-zmdi/search';
import menuIcon from '@iconify/icons-zmdi/menu';
@observer
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.openSidebar = this.openSidebar.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  openSidebar()
  {
    this.props.store.setShowSidebar(true);
  }

  onTabClick(tab)
  {
    return () => {this.props.store.setSelectedTab(tab)}
  }

  render() {
      return (
        <header className="header-v2">
          <div className="container-menu-desktop trans-03">
            <div className="wrap-menu-desktop">
              <nav className="limiter-menu-desktop p-l-45">
                <a href="#" className="logo">
                  <img src={require("../../images/icons/react2019logosmall.png")} alt="IMG-LOGO" />
                </a>
                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li className= { this.props.store.selectedTab == "Home"? "active-menu": "" } onClick={this.onTabClick("Home")}>
                      <NavLink to="/">Home</NavLink>     
                    </li>
                    <li className= { this.props.store.selectedTab == "Shop"? "active-menu": "" } onClick={this.onTabClick("Shop")}>
                      <a href="product.html" >Shop</a>
                      <ul className="sub-menu">
                        <li ><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/aaa">AAA</NavLink></li>
                      </ul>
                    </li>
                    <li className= { this.props.store.selectedTab == "Blog"? "active-menu": "" } onClick={this.onTabClick("Blog")}>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li className= { this.props.store.selectedTab == "About"? "active-menu": "" } onClick={this.onTabClick("About")}>
                        <NavLink to="/about">About</NavLink>     
                    </li>
                    <li className= { this.props.store.selectedTab == "Contact"? "active-menu": "" } onClick={this.onTabClick("Contact")}>
                        <NavLink to="/contact">Contact</NavLink>     
                    </li>
                    <li className= {this.props.store.selectedTab == "Sign In"? "active-menu": "" }  data-label1="hot" onClick={this.onTabClick("Sign In")}>
                        <NavLink to="/sign-in">Sign In</NavLink>     
                    </li>
                  </ul>
                </div>	
                <div className="wrap-icon-header flex-w flex-r-m h-full">
                  <div className="flex-c-m h-full p-r-24">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                    <Icon icon={searchIcon} />
                    </div>
                  </div>
                  <div className="flex-c-m h-full p-l-18 p-r-25 bor5">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify={2}>
                      <Icon icon={shoppingCart} />
                    </div>
                  </div>
                  <div className="flex-c-m h-full p-lr-19">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-sidebar" onClick={this.openSidebar}>
                      <Icon icon={menuIcon} />
                    </div>
                  </div>
                </div>
              </nav>
            </div>	
          </div>
        </header>
      );
    }
}
