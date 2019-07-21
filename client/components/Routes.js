import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom'; 
import Favicon from 'react-favicon';


import Home from "./pages/Home/home.js"
import About from "./pages/About/about.js"
import Contact from "./pages/Contact/contact.js"
import SignIn from "./pages/Sign-In/sign-in.js"
import SignUp from "./pages/Sign-Up/sign-up.js"
import aaa from "./pages/aaa.js"
import NavBar from "./NavBar/NavBar";
import SideBar from './SideBar/SideBar';
import Footer from './Footer/Footer';

// Stores
import navbarStore from "../stores/navbarStore.js"
import signupStore from "../stores/signupStore.js"


export default class Routes extends React.Component {
    render() {
      return (
      <BrowserRouter>
        <div>
        <Favicon url={require("../images/icons/controller.png")} />
        <NavBar store={navbarStore}/>
        <SideBar store={navbarStore}/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/sign-in" exact component={SignIn}/>
          <Route path="/sign-up" exact render={() => <SignUp store={signupStore}/>} />
          <Route path="/aaa" exact component={aaa}/>
        </Switch>
        <Footer/>
        </div>      
      </BrowserRouter>
      )
    }
}
