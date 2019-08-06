import React from 'react';
import {observer} from "mobx-react";
import classnames from "classnames";

@observer
export default class FilterPanelButton extends React.Component {
    render(){
        return ( 
        <li className="p-b-6">
            <button href="#" className={classnames("filter-link stext-106 trans-04" , {"filter-link-active": this.props.isActive})} onClick={this.props.onClick}>
                {this.props.text}
            </button>
        </li>
        )
    }
}