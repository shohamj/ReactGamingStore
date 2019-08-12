import React from 'react';
import {observer} from "mobx-react"

@observer
export default class CartItem extends React.Component {

  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }
  remove(){
    var self = this;
    fetch('/api/games/removeCart', {
      method: 'POST', 
      body: JSON.stringify({id: this.props.id}), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(() => self.props.cartStore.pullCart())
  }
  render() {
    return (
        <li className="header-cart-item flex-w flex-t m-b-12">
            <div className="header-cart-item-img" onClick={this.remove}>
                <img src={this.props.image} alt="IMG" />
            </div>
            <div className="header-cart-item-txt p-t-8">
                <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    {this.props.name}
                </a>
                <span className="header-cart-item-info">
                    {this.props.amount} x ${this.props.price}
                </span>
            </div>
        </li>
      );
  }
}
