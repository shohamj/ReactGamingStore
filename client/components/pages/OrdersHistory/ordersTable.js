import React from 'react';
import {observer} from "mobx-react";
import OrderRow from "./orderRow";
import TableBottom from "./tableBottom"
import { Icon, InlineIcon } from '@iconify/react';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import searchIcon from '@iconify/icons-fa-solid/search';
import redoIcon from '@iconify/icons-fa-solid/redo';
import {toJS} from "mobx"
import ReactLoading from "react-loading";
import SkyLight from 'react-skylight';
import CustomScroll from 'react-custom-scroll';

var dialog = {
    height: '80%',
    overflowY: "auto",
    overflowX: "hidden"
};

@observer
export default class OrdersTable extends React.Component {
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(e){
        this.props.orderStore.search = e.target.value;
    }
    reload(){
        this.props.orderStore.getGames();
    }
    deleteGame(){
        this.props.orderStore.deleteGame();
        this.props.orderStore.getGames();
        this.deleteGameDialog.hide();
    }
    render() {
        const pageOrders = toJS(this.props.orderStore.pageOrders);
        const currentpage = toJS(this.props.orderStore.currentpage);
        return (
            <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>Orders <b>History</b></h2>
                        </div>
                        <div className="col-sm-7">
                            <button className="btn btn-primary" style={{height:"35px"}} onClick={this.reload}><i className="material-icons"><Icon className="material-icons" icon={redoIcon} height="20" width="20" /></i> <span>Reload Games</span></button>
                            <div    className="btn btn-primary" style={{height:"35px"}}><i className="material-icons"><Icon className="material-icons" icon={searchIcon} height="20" width="20" /></i> <input type="text" placeholder="Search..." value={this.props.orderStore.search} onChange={this.onSearchChange} style={{background:"transparent"}}></input></div>
                        </div>
                    </div>
                </div>
                {this.props.orderStore.loading && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.orderStore.loading && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Game</th>						
                            <th>Price</th>						
                            <th>Amount</th>
                            <th>Ordered at</th>
                            <th>Total</th>
                            <th>Status</th>        
                        </tr>
                    </thead>
                 <tbody>
                 {pageOrders.map((order, index) => {
                     return <OrderRow order={order} index={index+(currentpage-1)*5 + 1} key={order._id} showDeleteDialog={() => this.deleteGameDialog.show()} orderStore={this.props.orderStore}/>
                    })}
                </tbody>
                </table>
                }
                <TableBottom orderStore={this.props.orderStore}/>
            </div>
        </div>   
        );
    }
}
