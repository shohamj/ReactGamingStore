import React from 'react';



export default class NavBar extends React.Component {
    render() {
      return (
        <div className="footer">
            <div className="container wrap">
              <div className="logo2">
                <a href="index.html"><img src={require("../images/logo2.png")} /></a>
              </div>
              <div className="ftr-menu">
                <ul>
                  <li><a href="bicycles.html">BICYCLES</a></li>
                  <li><a href="parts.html">PARTS</a></li>
                  <li><a href="accessories.html">ACCESSORIES</a></li>
                  <li><a href="404.html">EXTRAS</a></li>
                </ul>
              </div>
              <div className="clearfix" />
            </div>
          </div>
      );
    }
}
