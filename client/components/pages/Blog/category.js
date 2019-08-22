import React from 'react';
import {observer} from "mobx-react"
import {Link} from 'react-router-dom'

@observer
export default class Category extends React.Component {
    constructor(props){
        super(props)
        this.onClick= this.onClick.bind(this);
    }

    onClick(){
        if(this.props.blogStore.selectedCategory == this.props.category)
            this.props.blogStore.selectedCategory = "";
        else 
            this.props.blogStore.selectedCategory = this.props.category;
    }

    render() {
        return (
            <li className="bor18">
                <button onClick={this.onClick} to="#" className={"dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4 " + ((this.props.blogStore.selectedCategory==this.props.category)?"active":"")}>
                    {this.props.category}
                </button>
            </li>
            )
    }
}
