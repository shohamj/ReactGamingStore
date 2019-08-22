import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SingleCategoryCard from "./SingleCategoryCard";
import { CSSGrid, layout } from 'react-stonecutter';
import {observer} from "mobx-react";
@observer
export default class HomeCategories extends React.Component {
    
    render() {
        const games = [
			{name:'Racing',direct:'Racing'},
			{name:'Sports',direct:'Racing'},
			{name:'Multiplayer',direct:'Racing'},
		];
        const length = games.length;
        return (
          
        <div className="m-t-20 flex-w flex-c-m">
          {games.map((game, index) => (
              <SingleCategoryCard HomeCategoriesStore={this.props.HomeCategoriesStore} name={game.name} direct={game.direct} src={"/images/HomeCategories/" + game.name + ".jpg"} key={index} />
          ))}
        </div>
        
        );

    }
}
