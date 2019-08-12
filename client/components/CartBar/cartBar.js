import React from 'react';
import {observer} from "mobx-react"
import { withRouter } from "react-router-dom";
import CartItem from './cartItem.js'
import {Link} from 'react-router-dom'


@withRouter
@observer
export default class CartBar extends React.Component {

  constructor(props) {
    super(props);
    this.closeCartBar = this.closeCartBar.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  
  closeCartBar()
  {
    this.props.navbarStore.showCartBar=false;
  }
  onSignOut(){
    this.props.authStore.signOut();
    this.closeCartBar()
    this.props.history.push("/");
  }
  onOutsideClick(e){
    if (e.target.classList.contains("js-hide-cart")){
      this.closeCartBar()
    }
  }
  render() {
    return (
        <div className={"wrap-header-cart "  + (this.props.navbarStore.showCartBar ? 'show-header-cart' : "")}  onClick={this.onOutsideClick}>
          <div className="s-full js-hide-cart" />
          <div className="header-cart flex-col-l p-l-65 p-r-25">
            <div className="header-cart-title flex-w flex-sb-m p-b-8">
              <span className="mtext-103 cl2">
                Your Cart
              </span>
              <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 " onClick={this.closeCartBar}>
                <i className="zmdi zmdi-close" />
              </div>
            </div>
            {(this.props.cartStore.overAllAmount < 1) &&<div>
                <h4 className="mtext-105 m-t-100">
                      Your cart is empty. 
                </h4>
                <h4 className="mtext-105">
                      Buy some games!
                </h4>
            </div>}
            <div className="header-cart-content flex-w js-pscroll">
              <ul className="header-cart-wrapitem w-full">
                {this.props.cartStore.Items.map((item, index) => {
                    return <CartItem key={index} id={item.id} name={item.name} image={item.image} amount={item.amount} price={item.price} cartStore={this.props.cartStore}/>
                })}
              </ul>
              <div className="w-full">
                <div className="header-cart-total w-full p-tb-40">
                  Total: ${this.props.cartStore.overAllPrice}
                </div>
                <div className="header-cart-buttons flex-w w-full">
                  <Link to="/cart" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                    View Cart
                  </Link>
                  <Link to="/shop" className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                    Keep Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
