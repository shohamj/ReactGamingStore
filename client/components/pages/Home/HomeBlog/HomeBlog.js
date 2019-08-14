import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CSSGrid, layout } from 'react-stonecutter';
import SingleHomeBlog from './SingleHomeBlog';
import {observer} from "mobx-react";

@observer
export default class HomeBlog extends React.Component {
    render() {
        return (
      <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">
            Our Blogs
          </h3>
        </div>
        <div className="row">
            <SingleHomeBlog />
            <SingleHomeBlog />
            <SingleHomeBlog />
      </div>
      </div>
    </section>
            


        // <div className="flex-w flex-c-m">
        //   {games.map((game, index) => (
        //       <SingleCategoryCard name={game.name} direct={game.direct} src={require('./../../../../images/games/HomeCategories/' + game.name + '.jpg')} key={index} />
        //   ))}
        // </div>
        
        );

    }
}
