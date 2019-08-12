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
        this.props.gameStore.next();
        if (this.props.gameStore.maxPage === this.props.gameStore.currentpage)
            window.scrollTo(0, 0);
    }
    previous(){
        this.props.gameStore.previous();
    }
    render() {
        const start = (this.props.gameStore.currentpage -1)*5 + 1;
        const end = start + this.props.gameStore.pageGames.length - 1;
        return (
            <div className="clearfix">
            <div className="hint-text">Showing <b>{start}</b> <b>-</b> <b>{end}</b> entries</div>
            <ul className="pagination">
                {(this.props.gameStore.currentpage > 1) && <li className="page-item"><button className="page-link" onClick={this.previous}>Previous</button></li>}
                {this.props.gameStore.pageRange.map((value, index) => {
                     return <PageLink gameStore={this.props.gameStore} number={value} key={index} />
                })}
                {(this.props.gameStore.currentpage < this.props.gameStore.maxPage) &&<li className="page-item"><button onClick={this.next} className="page-link">Next</button></li>}
            </ul>
        </div>
      );
    }
}
