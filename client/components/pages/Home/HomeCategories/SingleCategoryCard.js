import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react";
import {NavLink} from 'react-router-dom'
import { withRouter } from "react-router-dom";

@observer
class SingleCategoryCard extends React.Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log(this.props.HomeCategoriesStore);
    this.props.HomeCategoriesStore.genre = this.props.name;
    this.props.history.push("shop");
  } 

    render(){
        var {name, src} = this.props;
        return (
          <div className="size-202 p-all-10 m-lr-auto respon4 cursor-pointer" >
            <div className="block1 wrap-pic-w"  >
              <img className="card-img-top" src={src} alt="Card image" style={{"borderRadius": "10px"}} />
              <a onClick={this.onSubmit} className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                <div className="block1-txt-child1 flex-col-l">
                  <span className="block1-name ltext-102 trans-05 p-b-8">
                     {name}
                  </span>
                  {/* <span className="block1-info stext-102 trans-05">
                    Top
                  </span> */}
                </div>
                <div className="block1-txt-child2 p-b-4 trans-05">
                  <div className="block1-link stext-101 cl0 trans-09">
                    Shop Now
                  </div>
                </div>
              </a>
            </div>
          </div>
       );
    }
}

export default withRouter(SingleCategoryCard);