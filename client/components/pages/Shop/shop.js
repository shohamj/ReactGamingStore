import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {observer} from "mobx-react";
import FilterButtons from './Filters/filter_buttons.js';
import FiltersPanel from './Filters/Panels/filters_panel.js';
import SearchPanel from './Filters/Panels/search_panel.js';
import Categories from './Filters/Categories/categories.js'
import GameCard from './Games/gameCard.js';
import { CSSGrid, layout } from 'react-stonecutter';
@observer
export default class Shop extends React.Component {
    constructor(props) {
      super(props);
      //this.changeCategory = this.changeCategory.bind(this);
    }
    componentDidMount(){
      this.props.shopStore.getGames();
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
                {(this.props.shopStore.filteredGames.length < 1) &&  
                <div className="flex-c-m">
                  <img src={require('../../../images/games/wherethemgamesat.gif') } width="200px"></img>
                </div>
                }
                {(this.props.shopStore.filteredGames.length < 1) &&  
                <div className="flex-c-m p-t-14">
                  <h3>No games found</h3>
                </div>
                }
                {this.props.shopStore.filteredGames.length > 0 &&
                <CSSGrid className="row" 
                  style={{width: "auto", height: "auto"}}
                  component="div"
                  columns={4}
                  columnWidth={300}
                  gutterWidth={10}
                  gutterHeight={15}
                  layout={layout.pinterest}
                  duration={300}
                  easing="ease-out">
                  {this.props.shopStore.filteredGames.map( (game, index) => (
                    <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-b-35" itemHeight={200}> 
                      <GameCard name={game.name} price={game.price} image={game.mainImage} id={game._id} />
                    </div>
                  ))}
                </CSSGrid>
                }
              </div>
            </div>
          );
    }
}