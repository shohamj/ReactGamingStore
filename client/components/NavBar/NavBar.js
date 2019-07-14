import React from 'react';
import {NavLink} from 'react-router-dom'
import {observer} from "mobx-react"

@observer
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.openSidebar = this.openSidebar.bind(this);
  }

  openSidebar()
  {
    this.props.store.showSidebar = true;
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
                    <li className="active-menu">
                      <NavLink to="/">Home</NavLink>     
                    </li>
                    <li>
                      <a href="product.html">Shop</a>
                      <ul className="sub-menu">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/aaa">AAA</NavLink></li>
                      </ul>
                    </li>
                    <li className="label1" data-label1="hot">
                      <a href="shoping-cart.html">Features</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>     
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>     
                    </li>
                  </ul>
                </div>	
                <div className="wrap-icon-header flex-w flex-r-m h-full">
                  <div className="flex-c-m h-full p-r-24">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                      <i className="zmdi zmdi-search" />
                    </div>
                  </div>
                  <div className="flex-c-m h-full p-l-18 p-r-25 bor5">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify={2}>
                      <i className="zmdi zmdi-shopping-cart" />
                    </div>
                  </div>
                  <div className="flex-c-m h-full p-lr-19">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-sidebar" onClick={this.openSidebar}>
                      <i className="zmdi zmdi-menu" />
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
