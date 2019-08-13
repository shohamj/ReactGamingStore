import React from 'react';
import {observer} from "mobx-react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
@observer
export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.order = this.order.bind(this);
  }
  order(){
    var self = this;
    fetch('/api/orders/addOrder')
    .then(fetch('/api/games/clearCart'))
    .then(() => self.props.cartStore.Items = [])
    .then(
      confirmAlert({
      title: 'Success',
      message: 'Your order will now await for manual confirmation by an employee or administrator.',
      buttons: [
        {
          label: 'Ok',
          onClick: undefined
        },
      ]
    }));
  
  }
  render() {
    return (
      <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
        <h4 className="mtext-109 cl2 p-b-30 bor12">
          Cart Totals
        </h4>
        <div className="flex-w flex-t p-t-27 p-b-33">
          <div className="size-208">
            <span className="mtext-101 cl2">
              Total:
            </span>
          </div>
          <div className="size-209 p-t-1">
            <span className="mtext-110 cl2">
              ${this.props.cartStore.overAllPrice}
            </span>
          </div>
        </div>
        <button type="button" className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer" onClick={this.order}>
          Order
        </button>
      </div>
    </div>
      );
  }
}
