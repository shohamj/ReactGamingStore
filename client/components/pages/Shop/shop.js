import React from 'react';
import {observer} from "mobx-react";
import FilterButtons from './Filters/filter_buttons.js';
import FiltersPanel from './Filters/Panels/filters_panel.js';
import SearchPanel from './Filters/Panels/search_panel.js';
import Categories from './Filters/Categories/categories.js'
import GameCard from './Games/gameCard.js';
import ReactLoading from "react-loading";
import ReactGridLayout from 'react-grid-layout';

import { CSSGrid, layout } from 'react-stonecutter';
@observer
export default class Shop extends React.Component {
    constructor(props) {
      super(props);
      
      //this.changeCategory = this.changeCategory.bind(this);
    }
    componentDidMount(){
      this.props.shopStore.getGames();
      var genre = this.props.HomeCategoriesStore.genre;
      this.props.shopStore.isFiltersPanelOpen =  false;
      this.props.shopStore.genre = "";
      if(genre != "")
      {
        console.log("im filtered");
        this.props.shopStore.genre = genre;
        this.props.shopStore.isFiltersPanelOpen =  true;
      }
      genre = "";
      this.props.HomeCategoriesStore.genre = "";
      console.log("is it true 3", this.props.shopStore.isFiltersPanelOpen, genre);
    }
    render(){
        return (
            <div className="bg0 m-t-23 p-b-140">
              <div className="container">
                <div className="flex-w flex-sb-m p-b-52">
                  <Categories shopStore={this.props.shopStore}/>  
                  <FilterButtons shopStore={this.props.shopStore}/>  
                  <SearchPanel   shopStore={this.props.shopStore}/>  
                  <FiltersPanel  shopStore={this.props.shopStore}/>  
                </div>
                {this.props.shopStore.loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={100} width={100}/>}
                {(this.props.shopStore.filteredGames.length < 1 && !this.props.shopStore.loading) &&  
                <div className="flex-c-m">
                  <img src="/images/games/wherethemgamesat.gif"width="200px"></img>
                </div>
                }
                {(this.props.shopStore.filteredGames.length < 1 && !this.props.shopStore.loading) &&  
                <div className="flex-c-m p-t-14">
                  <h3>No games found</h3>
                </div>
                }
                {this.props.shopStore.filteredGames.length > 0 &&
                // <CSSGrid className="row" 
                //   style={{width: "auto", height: "auto"}}
                //   component="div"
                //   columns={4}
                //   columnWidth={300}
                //   gutterWidth={10}
                //   gutterHeight={15}
                //   layout={layout.pinterest}
                //   duration={300}
                //   easing="ease-out">
                //   {this.props.shopStore.filteredGames.map( (game, index) => (
                //     <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-b-35" itemHeight={200}> 
                //       <GameCard name={game.name} price={game.price} image={game.mainImage} id={game._id} />
                //     </div>
                //   ))}
                // </CSSGrid>
                <div className="container">
                  <div className="row">
                    {this.props.shopStore.filteredGames.map( (game, index) => (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-b-35"> 
                    <GameCard  name={game.name} price={game.price} image={game.mainImage} id={game._id} />
                    </div>
                  ))}
                  </div>
                </div>
                }
              </div>
            </div>
          );
    }
}