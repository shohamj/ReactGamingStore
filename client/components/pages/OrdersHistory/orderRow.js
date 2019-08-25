import React from 'react';
import {observer} from "mobx-react";
import { confirmAlert } from 'react-confirm-alert'; // Import

import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-zmdi/edit';
import deleteIcon from '@iconify/icons-zmdi/delete';
import checkCircle from '@iconify/icons-zmdi/check-circle';
import closeCircle from '@iconify/icons-zmdi/close-circle';

import Select from 'react-select';


@observer
export default class GameRow extends React.Component {
    constructor(props) {
      super(props);
      this.cancel = this.cancel.bind(this);
      this.accept = this.accept.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
      this.getData = this.getData.bind(this);
    } 

    edit(){
      this.setState({isEditing: true, lastRole: this.state.role});
    }
    getData(status)
    {
      let data = {
        user: this.props.order.user,
        game: this.props.order.game,
        price: this.props.order.price,
        amount: this.props.order.amount,
        total: this.props.order.total,
        status: status,
        ordered: this.props.order.ordered,
      }
      return data;
      
    }
    sendEmail(data,email)
    {
      console.log("hello", email);
      data.email = email;
      fetch('/api/orders/sendOrderStatus', {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
          'Content-Type': 'application/json'
        }})
        .then(()=> {
        });
    }
    cancel(){
      var self = this;
      let data = this.getData("canceled");

      fetch('/api/orders/cancelOrder', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.order._id}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((response) => {
        self.sendEmail(data, response.email);
      })
      .then(() => self.props.orderStore.getOrders())
    }
    accept(){
      var self = this;
      let data = this.getData("accepted");
     
      fetch('/api/orders/acceptOrder', {
        method: 'POST', 
        body: JSON.stringify({id: this.props.order._id}), 
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((response) => {
        self.sendEmail(data, response.email);
      })
      .then(() => self.props.orderStore.getOrders())
    }

    render() {
        const {user, game, price, amount, total, ordered, status} = this.props.order;
        const role = this.props.authStore.role;
        console.log("role: " + role);
        return (
          <tr>
          <td>{this.props.index}</td>
          {(role == "manager" || role == "employee") && <td >{user}</td> }
          <td >{game}</td>
          <td >${price}</td>
          <td >{amount}</td>
          <td>{ordered.split('T')[0].split('-').reverse().join("/")}</td>                        
          <td >${total}</td>
          <td >{status}</td>

          {((role == "manager" || role == "employee") && status == "Pending") && 
					<td>
          <button className="edit" title="Accept Order" onClick={this.accept}><Icon icon={checkCircle} color="#5cb85c" height="22" width="22" className="edit"/></button>
          <button  title="Cancel Order" onClick={this.cancel}><Icon icon={closeCircle} color="#d9534f" height="22" width="22" className="delete"/></button>
					</td>
          }
          {status != "Pending" && <td></td>}
          </tr>
          
      );
    }
}
