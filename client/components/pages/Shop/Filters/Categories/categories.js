import React from 'react';
import {observer} from "mobx-react";
import CategoryButton from './categoryButton'

@observer
export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
    }
    changeCategory(category){
      this.props.shopStore.category = category;
    }
    render(){
        return (
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <CategoryButton text="All Games" isActive={this.props.shopStore.category == ""} onClick={() => this.changeCategory("")}/>
              <CategoryButton text="Recently Added" isActive={this.props.shopStore.category == "recent"} onClick={() => this.changeCategory("recent")}/>
              <CategoryButton text="Top Selling" isActive={this.props.shopStore.category == "top_selling"} onClick={() => this.changeCategory("top_selling")}/>
              <CategoryButton text="Controller Support" isActive={this.props.shopStore.category == "controller"} onClick={() => this.changeCategory("controller")}/>
            </div>  
          );
    }
}