import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {observer} from "mobx-react";
import classnames from "classnames";


@observer
export default class CategoryButton extends React.Component {
    render(){
        return (
            <button href="#" className={classnames("stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" , {"how-active1": this.props.isActive})} onClick={this.props.onClick}>
                {this.props.text}
            </button>
          );
    }
}