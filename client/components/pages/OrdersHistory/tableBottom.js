import React from 'react';
import {observer} from "mobx-react";
import PageLink from './pageLink.js';

@observer
export default class TableBottom extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next(){
        this.props.orderStore.next();
        if (this.props.orderStore.maxPage === this.props.orderStore.currentpage)
            window.scrollTo(0, 0);
    }
    previous(){
        this.props.orderStore.previous();
    }
    render() {
        const start = (this.props.orderStore.currentpage -1)*5 + 1;
        const end = start + this.props.orderStore.pageOrders.length - 1;
        return (
            <div className="clearfix">
            <div className="hint-text">Showing <b>{start}</b> <b>-</b> <b>{end}</b> entries</div>
            <ul className="pagination">
                {(this.props.orderStore.currentpage > 1) && <li className="page-item"><button className="page-link" onClick={this.previous}>Previous</button></li>}
                {this.props.orderStore.pageRange.map((value, index) => {
                     return <PageLink orderStore={this.props.orderStore} number={value} key={index} />
                })}
                {(this.props.orderStore.currentpage < this.props.orderStore.maxPage) &&<li className="page-item"><button onClick={this.next} className="page-link">Next</button></li>}
            </ul>
        </div>
      );
    }
}
