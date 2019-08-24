import React from 'react';
import {Link} from 'react-router-dom'

export default class CarouselItem extends React.Component {
    
    render() {
        const {firstHeader, secondHeader, image} = this.props;
        return (
            <div className="item-slick1" style={{backgroundImage: `url(${image})`}}>
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30">
                <div className="layer-slick1 animated ">
                  <span className="ltext-202 clmy respon2">
                    {firstHeader}
                  </span>
                </div>
                <div className="layer-slick1 animated ">
                  <h2 className="ltext-104 clmy p-t-19 p-b-43 respon1">
                  {secondHeader}
                  </h2>
                </div>
                <div className="layer-slick1 animated " >
                  <Link to="/shop" className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        );
    }
}