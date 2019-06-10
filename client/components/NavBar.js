import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/bootstrap.css'
import "../css/style.css"
import "../css/nav.css"
import "../css/roboto.css"


import "../js/jquery.easydropdown.js"
import "../js/move-top.js"
import "../js/easing.js"
import "../js/responsiveslides.min.js"
//import "../js/jquery.flexisel.js"  


export default class NavBar extends React.Component {
    render() {
      return (
        <div>
          {/*
  Author: W3layouts
  Author URL: http://w3layouts.com
  License: Creative Commons Attribution 3.0 Unported
  License URL: http://creativecommons.org/licenses/by/3.0/
  */}
          <title>Bike Shop a Ecommerce Category Flat Bootstarp Responsive Website Template| Home :: w3layouts</title>
          {/* jQuery (Bootstrap's JavaScript plugins) */}
          {/* Custom Theme files */}
          {/* Custom Theme files */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="keywords" content="Bike-shop Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
  Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
          {/*webfont*/}
            <div className="container" style={{"background": "black"}}>
              <div className="header">
                <div className="logo">
                  <NavLink to="/"><img src={require("../images/logo.png")} /></NavLink>
                </div>	
                <div className="logo">
                  <NavLink to="/aaa"><img src={require("../images/logo.png")} /></NavLink>
                </div>							 
                <div className="top-nav">										 
                  <label className="mobile_menu" htmlFor="mobile_menu">
                    <span>Menu</span>
                  </label>
                  <input id="mobile_menu" type="checkbox" />
                  <ul className="nav">
                    <li className="dropdown1"><a href="bicycles.html">BICYCLES</a>
                      <ul className="dropdown2">
                        <li><a href="bicycles.html">FIXED / SINGLE SPEED</a></li>
                        <li><a href="bicycles.html">CITY BIKES</a></li>
                        <li><a href="bicycles.html">PREMIMUN SERIES</a></li>												
                      </ul>
                    </li>
                    <li className="dropdown1"><a href="parts.html">PARTS</a>
                      <ul className="dropdown2">
                        <li><a href="parts.html">CHAINS</a></li>
                        <li><a href="parts.html">TUBES</a></li>
                        <li><a href="parts.html">TIRES</a></li>
                        <li><a href="parts.html">DISC BREAKS</a></li>
                      </ul>
                    </li>      
                    <li className="dropdown1"><a href="accessories.html">ACCESSORIES</a>
                      <ul className="dropdown2">
                        <li><a href="accessories.html">LOCKS</a></li>
                        <li><a href="accessories.html">HELMETS</a></li>
                        <li><a href="accessories.html">ARM COVERS</a></li>
                        <li><a href="accessories.html">JERSEYS</a></li>
                      </ul>
                    </li>               
                    <li className="dropdown1"><a href="404.html">EXTRAS</a>
                      <ul className="dropdown2">
                        <li><a href="404.html">CLASSIC BELL</a></li>
                        <li><a href="404.html">BOTTLE CAGE</a></li>
                        <li><a href="404.html">TRUCK GRIP</a></li>
                      </ul>
                    </li>
                    <a className="shop" href="cart.html"><img src={require("../images/cart.png")} /></a>
                  </ul>
                </div>
                <div className="clearfix" />
              </div>
            </div>	 
            				 
          {/*/banner*/}
          {/**/}
          
          {/**/}
        </div>
      );
    }
}
