import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react";

@observer
export default class SingleCategoryCard extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        //var {name, price, image, id} = this.props.game;
        console.log("im here");
        var name = "cool";
        var price = '34$';
        var id = "123123";
        var image = 'enslaved/1.png';
        return (
          <div>
            <div className="block2">
              <div className="block2-pic hov-img0" style={{"borderRadius": "5px"}}>
                <img src={require("../../../../images/games/" + image)}/>
                <Link to={"/shop/games/" + id} className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                  View
                </Link>
              </div>
              <div className="block2-txt flex-w flex-t p-t-14">
                <div className="block2-txt-child1 flex-col-l ">
                  <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
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
