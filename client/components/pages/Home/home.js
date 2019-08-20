import React from 'react';
import HomeCarousel from './homeCarousel'
import HomeCategories from './HomeCategories/HomeCategories';
import HomeBlog from './HomeBlog/HomeBlog';
import TopGames from './TopGames/TopGames';
import {observer} from "mobx-react";

@observer
export default class Home extends React.Component {
    render() {
      var a = this.props.HomeCategoriesStore;
      console.log("HomeStore", a);
      return (
        <div>
          <HomeCarousel/>
          <HomeCategories HomeCategoriesStore={this.props.HomeCategoriesStore}/>
          <section className="sec-product bg0 p-t-100 p-b-50">
            <div className="container">
              <div className="p-b-32">
                <h3 className="ltext-105 cl5 txt-center respon1">
                  Top Games
                </h3>
              </div>
            </div>
          </section>
          <TopGames />
          <HomeBlog />
        </div>
       
      );
    }
}
