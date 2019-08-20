import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react";

@observer
export default class SingleTopGames extends React.Component {
  
    render(){
        const {name, price, image, id} = this.props;
        return (
          <div>
            <div className="block2" alt="david">
              <div className="block2-pic hov-img0" style={{"borderRadius": "8px"}} >
                <img src={image}/>
                <Link to={"/shop/games/" + id} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                  Details
                </Link>
              </div>
              <div className="block2-txt flex-w center flex-t p-t-14 p-l-45">
                <div className="block2-txt-child1 center flex-col-l ">
                  <a href="product-detail.html"  className="stext-104 txt-center cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    {name}
                  </a>
                  <span className="stext-105 cl3">
                    ${price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
