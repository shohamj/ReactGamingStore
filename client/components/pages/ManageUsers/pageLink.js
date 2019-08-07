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
        this.props.userStore.currentpage = this.props.number;
        if (this.props.userStore.maxPage === this.props.number)
            window.scrollTo(0, 0);

    }
    render() {
        const {userStore, number} = this.props;
        return (
            <li className={classnames("page-item", {"active": userStore.currentpage == number })}><button onClick={this.onClick} className="page-link">{number}</button></li>
      );
    }
}
