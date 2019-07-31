import React from 'react';
import {observer} from "mobx-react";
import MyDropdown from '../../../../dropdown.js'
@observer
export default class SearchPanel extends React.Component {

    render(){
        return(
          <MyDropdown className={"panel-search w-full p-t-10 p-b-15 "} open={this.props.shopStore.isSearchPanelOpen} >
              <div className="bor8 dis-flex p-l-15">
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i className="zmdi zmdi-search" />
                </button>
                <input className="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search" />
              </div>	
          </MyDropdown>

        )
    }
}
