import React from 'react';
import CartItem from './cartItem.js';
import {observer} from "mobx-react"

@observer
export default class Cart extends React.Component {
    
    render() {
      return (
        <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
          <div className="m-l-25 m-r--38 m-lr-0-xl">
            <div className="wrap-table-shopping-cart">
              <table className="table-shopping-cart">
                <tbody>
                  <tr className="table_head">
                    <th className="column-1">Game</th>
                    <th className="column-2" />
                    <th className="column-3">Price</th>
                    <th className="column-4">Quantity</th>
                    <th className="column-5">Total</th>
                  </tr>
                  
                  {this.props.cartStore.Items.map((item, index) => {
                    return <CartItem key={index} index={index} item={item}   cartStore={this.props.cartStore}/>
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {(this.props.cartStore.overAllAmount < 1) &&<div>
                    <h4 className="mtext-105 m-l-250 m-t-100">
                          Your cart is empty. 
                    </h4>
          </div>}
        </div>
      );
    }
}