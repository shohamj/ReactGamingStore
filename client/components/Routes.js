import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom'; 

import Home from "./pages/Home/home.js"
import About from "./pages/About/about.js"
import Contact from "./pages/Contact/contact.js"
import aaa from "./pages/aaa.js"
import NavBar from "./NavBar/NavBar";
import SideBar from './SideBar/SideBar';
import Footer from './Footer/Footer';

import navbarStore from "../stores/navbarStore.js"

export default class Routes extends React.Component {
    render() {
      return (
      <BrowserRouter>
        <div>
        <NavBar store={navbarStore}/>
        <SideBar store={navbarStore}/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/aaa" component={aaa}/>
        </Switch>
        <Footer/>
        </div>      
      </BrowserRouter>
      )
    }
}
