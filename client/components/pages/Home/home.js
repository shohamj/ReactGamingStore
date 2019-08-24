import React from 'react';
import HomeCarousel from './HomeCarousel/homeCarousel'
import HomeCategories from './HomeCategories/HomeCategories';
import HomeBlog from './HomeBlog/HomeBlog';
import TopGames from './TopGames/TopGames';
import {observer} from "mobx-react";

@observer
export default class Home extends React.Component {
    render() {
      return (
        <div>
          <HomeCarousel/>
          <HomeCategories HomeCategoriesStore={this.props.HomeCategoriesStore}/>
          <TopGames />
          <HomeBlog />
        </div>
       
      );
    }
}
