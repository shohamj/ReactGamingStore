import React from 'react';
import {observer} from "mobx-react";
import MyDropdown from '../../../../dropdown.js';
import FilterPanelButton from './filter_panel_button';
@observer
export default class FiltersPanel extends React.Component {
    constructor(props) {
      super(props);

      this.changeGenre = this.changeGenre.bind(this);
      this.changePlatform = this.changePlatform.bind(this);
      this.changePrice = this.changePrice.bind(this);
      this.changeSort = this.changeSort.bind(this);
    }
    changeGenre(genre){
      this.props.shopStore.genre = genre;
    }
    changePlatform(platform){
      this.props.shopStore.platform = platform;
    }
    changePrice(price){
      this.props.shopStore.price = price;
    }
    changeSort(sort){
      this.props.shopStore.sort = sort;
    }
    render(){
        return(
            <MyDropdown className={"panel-filter w-full p-t-10 "} open={this.props.shopStore.isFiltersPanelOpen}>
              <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm ">
                <div className="filter-col1 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">
                    Sort By
                  </div>
                  <ul>
                    <FilterPanelButton text="Popularity" isActive={this.props.shopStore.sort == "Popularity"} onClick={() => this.changeSort("Popularity")}/>
                    <FilterPanelButton text="Release Date: Newest to Oldest" isActive={this.props.shopStore.sort == "Newest to Oldest"} onClick={() => this.changeSort("Newest to Oldest")}/>
                    <FilterPanelButton text="Release Date: Oldest to Newest" isActive={this.props.shopStore.sort == "Oldest to Newest"} onClick={() => this.changeSort("Oldest to Newest")}/>
                    <FilterPanelButton text="Price: Low to High" isActive={this.props.shopStore.sort == "Low to High"} onClick={() => this.changeSort("Low to High")}/>
                    <FilterPanelButton text="Price: High to Low" isActive={this.props.shopStore.sort == "High to Low"} onClick={() => this.changeSort("High to Low")}/>
                  </ul>
                </div>
                <div className="filter-col2 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">
                    Price
                  </div>
                  <ul>
                    <FilterPanelButton text="All" isActive={JSON.stringify(this.props.shopStore.price) == JSON.stringify([0])} onClick={() => this.changePrice([0])}/>
                    <FilterPanelButton text="$0.00 - $5.00" isActive={JSON.stringify(this.props.shopStore.price) == JSON.stringify([0,5])} onClick={() => this.changePrice([0,5])}/>
                    <FilterPanelButton text="$5.00 - $10.00" isActive={JSON.stringify(this.props.shopStore.price) == JSON.stringify([5,10])} onClick={() => this.changePrice([5,10])}/>
                    <FilterPanelButton text="$10.00 - $50.00" isActive={JSON.stringify(this.props.shopStore.price) == JSON.stringify([10,50])} onClick={() => this.changePrice([10,50])}/>
                    <FilterPanelButton text="$50.00+" isActive={JSON.stringify(this.props.shopStore.price) == JSON.stringify([50])} onClick={() => this.changePrice([50])}/>
                  </ul>
                </div>
                <div className="filter-col3 p-r-0 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">
                    Genre
                  </div>
                  <ul>
                    <FilterPanelButton text="All" isActive={this.props.shopStore.genre == ""} onClick={() => this.changeGenre("")}/>
                    <FilterPanelButton text="Action" isActive={this.props.shopStore.genre == "Action"} onClick={() => this.changeGenre("Action")}/>
                    <FilterPanelButton text="Adventure" isActive={this.props.shopStore.genre == "Adventure"} onClick={() => this.changeGenre("Adventure")}/>
                    <FilterPanelButton text="Casual" isActive={this.props.shopStore.genre == "Casual"} onClick={() => this.changeGenre("Casual")}/>
                    <FilterPanelButton text="Indie" isActive={this.props.shopStore.genre == "Indie"} onClick={() => this.changeGenre("Indie")}/>
                    <FilterPanelButton text="Multiplayer" isActive={this.props.shopStore.genre == "Multiplayer"} onClick={() => this.changeGenre("Multiplayer")}/>
                    <FilterPanelButton text="Racing" isActive={this.props.shopStore.genre == "Racing"} onClick={() => this.changeGenre("Racing")}/>
                    <FilterPanelButton text="Sports" isActive={this.props.shopStore.genre == "Sports"} onClick={() => this.changeGenre("Sports")}/>
                  </ul>
                </div>
                <div className="filter-col4 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">
                    Platform
                  </div>
                  <ul>
                    <FilterPanelButton text="All" isActive={this.props.shopStore.platform == ""} onClick={() => this.changePlatform("")}/>
                    <FilterPanelButton text="PC" isActive={this.props.shopStore.platform == "PC"} onClick={() => this.changePlatform("PC")}/>
                    <FilterPanelButton text="Mac OSX" isActive={this.props.shopStore.platform == "MAC"} onClick={() => this.changePlatform("MAC")}/>
                    <FilterPanelButton text="Linux" isActive={this.props.shopStore.platform == "Linux"} onClick={() => this.changePlatform("Linux")}/>
                  </ul>
                </div>
              </div>
            </MyDropdown>
        )
    }
}
