import React from 'react';
import HomeCarousel from './homeCarousel'
import HomeCategories from './HomeCategories/HomeCategories';
import {observer} from "mobx-react";

@observer
export default class Home extends React.Component {
    render() {
      return (
        <div>
          <HomeCarousel/>
          <HomeCategories/>
        </div>
       
      );
    }
}
