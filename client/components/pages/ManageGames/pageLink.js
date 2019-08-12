import React from 'react';
import {observer} from "mobx-react";
import classnames from "classnames";

@observer
export default class PageLink extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
      }
    
    onClick(){
        this.props.gameStore.currentpage = this.props.number;
        if (this.props.gameStore.maxPage === this.props.number)
            window.scrollTo(0, 0);

    }
    render() {
        const {gameStore, number} = this.props;
        return (
            <li className={classnames("page-item", {"active": gameStore.currentpage == number })}><button onClick={this.onClick} className="page-link">{number}</button></li>
      );
    }
}
