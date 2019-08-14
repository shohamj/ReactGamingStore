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
			{name:'Shooting',direct:'Racing'},
		];
        const length = games.length;
        console.log('length', length);
        return (
          
        <div className="flex-w flex-c-m">
          {games.map((game, index) => (
              <SingleCategoryCard name={game.name} direct={game.direct} src={"images/games/HomeCategories/" + game.name + ".jpg"} key={index} />
          ))}
        </div>
        
        );

    }
}
