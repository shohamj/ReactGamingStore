import React from 'react';
import {observer} from "mobx-react"

function round(number){
  let num = Number(number);
  var roundedString = num.toFixed(2);
  var rounded = Number(roundedString); 
  return rounded;
}
@observer
export default class CartItem extends React.Component {

    constructor(props) {
        super(props);
        
        this.amountChanged = this.amountChanged.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.delete = this.delete.bind(this);
    }

    amountChanged(e){
        this.props.cartStore.Items[this.props.index].amount = e.target.value;
    }
    add(){
      var self = this;
      fetch('/api/games/addCart', {
        method: 'POST', 
        body: JSON.stringify({id: self.props.item.id, 
          amount: 1, 
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => self.props.cartStore.pullCart())
    }
    remove(){
      var self = this;
      fetch('/api/games/addCart', {
        method: 'POST', 
        body: JSON.stringify({id: self.props.item.id, 
          amount: -1, 
        }), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => self.props.cartStore.pullCart())
    }
    delete(){
      var self = this;
      fetch('/api/games/removeCart', {
        method: 'POST', 
        body: JSON.stringify({id: self.props.item.id}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(() => self.props.cartStore.pullCart())
    }
    
    render() {
        const item = this.props.item;
        return (
            <tr className="table_row">
                <td className="column-1">
                    <div className="how-itemcart1" onClick={this.delete}>
                        <img src={item.image} alt="IMG" />
                    </div>
                    </td>
                    <td className="column-2">{item.name}</td>
                    <td className="column-3">${item.price}</td>
                    <td className="column-4">
                      <div className="wrap-num-product flex-w m-l-auto m-r-0">
                        <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onClick={this.remove}>
                          <i className="fs-16 zmdi zmdi-minus" />
                        </div>
                        <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value={item.amount} onChange={this.amountChanged}  />
                        <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"  onClick={this.add}>
                          <i className="fs-16 zmdi zmdi-plus" />
                        </div>
                      </div>
                    </td>
                    <td className="column-5">${round(item.price * item.amount)}</td>
            </tr>
          );
      
    }
}
