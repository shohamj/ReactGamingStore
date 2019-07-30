import React from 'react';
import {observer} from "mobx-react";

@observer
export default class FilterButtons extends React.Component {
    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.toggleFiltersPanel = this.toggleFiltersPanel.bind(this);
        this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
    
    }
    toggleFiltersPanel(){
        this.props.shopStore.toggleFiltersPanel();
    }
    toggleSearchPanel(){
        this.props.shopStore.toggleSearchPanel();
    }
    render(){
        const {isSearchPanelOpen, isFiltersPanelOpen} = this.props.shopStore;
        return(
            <div className="flex-w flex-c-m m-tb-10">
                    <div className={"flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter " + (isFiltersPanelOpen?"show-filter":"")} onClick={this.toggleFiltersPanel}>
                      <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list" />
                      <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                      Filter
                    </div>
                    <div className={"flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search " + (isSearchPanelOpen?"show-filter":"")} onClick={this.toggleSearchPanel}>
                      <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
                      <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                      Search
                    </div>
            </div>
        )
    }
}
