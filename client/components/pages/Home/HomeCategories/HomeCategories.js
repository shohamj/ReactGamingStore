import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SingleCategoryCard from "./SingleCategoryCard";
import { CSSGrid, layout } from 'react-stonecutter';
import {observer} from "mobx-react";

@observer
export default class HomeCategories extends React.Component {
    
    render() {
        const games = ['Action','Sport','Adventure'];
        const length = games.length;
        console.log('length', length);
        return (

            <div className="bg0 m-t-23 p-b-140">
            <div className="container">
              {length > 0 &&
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
                {games.map((game, index) => {
                      console.log('game',game + index);
                    return (<div key={index} className="col-sm-6 col-md-4 col-lg-3 p-b-35" itemHeight={150}> 
                       <SingleCategoryCard />
                    </div>)
                })}
              </CSSGrid>
              }
            </div>
          </div>
        );

    }
}
