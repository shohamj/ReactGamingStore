import React from 'react';
import CartItems from './CartItems/cartItems.js'
import CartCheckout from './cartCheckout.js'
import {observer} from "mobx-react"

@observer
export default class Cart extends React.Component {
    render() {
      console.log(this.props.cartStore.Items);
        return (
            <form className="bg0 p-t-75 p-b-85">
              <div className="container">
                <div className="row">
                    <CartItems cartStore={this.props.cartStore}/>
                    <CartCheckout cartStore={this.props.cartStore}/>
                </div>
              </div>
            </form>
          );
      
    }
}
