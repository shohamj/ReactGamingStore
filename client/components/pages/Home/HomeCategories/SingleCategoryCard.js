import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react";
import {NavLink} from 'react-router-dom'

@observer
export default class SingleCategoryCard extends React.Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onTabClick = this.onTabClick.bind(this);
  }
  onTabClick(tab)
  {
    return () => {this.props.navbarStore.setSelectedTab(tab)}
  }

    render(){
        var {name, src} = this.props;
        console.log('name + src',name,src);
        return (
          <div className="size-202 m-lr-auto respon4">
            <div className="block1 wrap-pic-w"  >
              <img className="card-img-top" src={src} alt="Card image" style={{width: '100%'}} />
              <NavLink to="./../shop" className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
                <div className="block1-txt-child1 flex-col-l">
                  <span className="block1-name ltext-102 trans-04 p-b-8">
                    {name}
                  </span>
                  <span className="block1-info stext-102 trans-04">
                    Spring 2018
                  </span>
                </div>
                <div className="block1-txt-child2 p-b-4 trans-05">
                  <div className="block1-link stext-101 cl0 trans-09">
                    Shop Now
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
       );
    }
}
