import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {observer} from "mobx-react"

import { Icon, InlineIcon } from '@iconify/react';
import shoppingCart from '@iconify/icons-zmdi/shopping-cart';
import accountIcon from '@iconify/icons-zmdi/account';
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
    this.props.navbarStore.setShowSidebar(true);
  }

  onTabClick(tab)
  {
    return () => {this.props.navbarStore.setSelectedTab(tab)}
  }

  render() {
      return (
        <header className="header-v2">
          <div className="container-menu-desktop trans-03">
            <div className="wrap-menu-desktop">
              <nav className="limiter-menu-desktop p-l-45">
                <a href="#" className="logo">
                  <img src="/images/icons/react2019logosmall.png" alt="IMG-LOGO" />
                </a>
                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li>
                      <NavLink exact to="/" activeStyle={{color: "#717fe0"}}>Home</NavLink>     
                    </li>
                    <li>
                      <NavLink to="/shop" activeStyle={{color: "#717fe0"}}>Shop</NavLink>
                    </li>
                    <li>
                      <NavLink to="/blog" activeStyle={{color: "#717fe0"}}>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeStyle={{color: "#717fe0"}}>About</NavLink>     
                    </li>
                    <li>
                        <NavLink to="/contact" activeStyle={{color: "#717fe0"}}>Contact</NavLink>     
                    </li>
                  </ul>
                </div>	
                <div className="wrap-icon-header flex-w flex-r-m h-full">
                  <div className="flex-c-m h-full p-r-24">
                  { !this.props.authStore.currentUser &&      
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                      <Link to="/sign-in">
                        <button className="flex-c-m stext-101 cl0 size-107  bg1 bor1 hov-btn1 p-lr-15 trans-04" onClick={this.onTabClick("Sign In")}>
                          Sign In
                        </button>
                      </Link>
                    </div>
                  }
                  </div>
                  { (this.props.authStore.currentUser && this.props.authStore.role == "customer") &&      
                  <div className="flex-c-m h-full p-l-18 p-r-25 bor5">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify={2}>
                      <Icon icon={shoppingCart} />
                    </div>
                  </div>
                  }
                  { this.props.authStore.currentUser &&      
                  <div className={"flex-c-m h-full p-lr-19 " + (this.props.authStore.role != "customer" ? "bor5":"")}>
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-sidebar" onClick={this.openSidebar}>
                      <Icon icon={accountIcon} />
                    </div>
                  </div>
                  }
                </div>
              </nav>
            </div>	
          </div>
        </header>
      );
    }
}
