import React from 'react';
import {observer} from "mobx-react";
import PageLink from './pageLink.js';

@observer
export default class ManageUserBottom extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next(){
        this.props.userStore.next();
        if (this.props.userStore.maxPage === this.props.userStore.currentpage)
            window.scrollTo(0, 0);
    }
    previous(){
        this.props.userStore.previous();
    }
    render() {
        const start = (this.props.userStore.currentpage -1)*5 + 1;
        const end = start + this.props.userStore.pageUsers.length - 1;
        return (
            <div className="clearfix">
            <div className="hint-text">Showing <b>{start}</b> <b>-</b> <b>{end}</b> entries</div>
            <ul className="pagination">
                {(this.props.userStore.currentpage > 1) && <li className="page-item"><button className="page-link" onClick={this.previous}>Previous</button></li>}
                {this.props.userStore.pageRange.map((value, index) => {
                     return <PageLink userStore={this.props.userStore} number={value} key={index} />
                })}
                {(this.props.userStore.currentpage < this.props.userStore.maxPage) &&<li className="page-item"><button onClick={this.next} className="page-link">Next</button></li>}
            </ul>
        </div>
      );
    }
}
