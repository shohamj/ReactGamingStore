import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {observer} from "mobx-react"

import { Icon, InlineIcon } from '@iconify/react';
import shoppingCart from '@iconify/icons-zmdi/shopping-cart';
import accountIcon from '@iconify/icons-zmdi/account';
@observer
export default class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.openCartBar = this.openCartBar.bind(this);
  }
  toggleMobileMenu(){
      this.props.navbarStore.showMobileMenu = !this.props.navbarStore.showMobileMenu;
  }
  openSidebar()
  {
    this.props.navbarStore.showSidebar = true;
    this.props.navbarStore.showCartBar = false;
  }

  openCartBar()
  {
    this.props.navbarStore.showSidebar = false;
    this.props.navbarStore.showCartBar = true;
  }

  render() {
    var showMobile = this.props.navbarStore.showMobileMenu;
    return (
        <div className="wrap-header-mobile topZero">
          <div className="logo-mobile">
            <a href="index.html"><img src="/images/icons/react2019logosmall.png" alt="IMG-LOGO" /></a>
          </div>
          { !this.props.authStore.currentUser &&      
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                      <Link to="/sign-in">
                        <button className="flex-c-m stext-101 cl0 size-107  bg1 bor1 hov-btn1 p-lr-15 trans-04">
                          Sign In
                        </button>
                      </Link>
                    </div>
            }
        { this.props.authStore.currentUser &&      
          <div className="wrap-icon-header flex-w flex-r-m h-full m-r-15">

            <div className="flex-c-m h-full p-r-10" onClick={this.openSidebar}>
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11">
                <i className="zmdi zmdi-settings" />
              </div>
            </div>
            <div className="flex-c-m h-full p-lr-10 bor5">
              <div className={"icon-header-item cl2 hov-cl1 trans-04 p-lr-11 " + ((this.props.cartStore.overAllAmount>0)?"icon-header-noti":"")}  onClick={this.openCartBar} data-notify={this.props.cartStore.overAllAmount}>
                <i className="zmdi zmdi-shopping-cart" />
              </div>
            </div>
          </div>
        }
        { this.props.authStore.currentUser &&      
          <div className={"btn-show-menu-mobile hamburger hamburger--squeeze " + (showMobile?"is-active":"") } onClick={this.toggleMobileMenu}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </div>
        }       
       </div>
        
      );
    }
}
