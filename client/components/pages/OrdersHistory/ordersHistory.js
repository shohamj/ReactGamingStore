import React from 'react';
import {observer} from "mobx-react";
import OrdersTable from "./ordersTable.js";
import "./../../../css/mangmentTables.css"

@observer
export default class OrdersHistory extends React.Component {
    
    componentDidMount(){
        this.props.orderStore.getOrders();
    }
    render() {
        return (
          <OrdersTable orderStore={this.props.orderStore} authStore={this.props.authStore}/>
      );
    }
}
