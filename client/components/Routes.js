import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Favicon from 'react-favicon';

// Components
import NotFound from './pages/404/NotFound';
import Home from "./pages/Home/home.js"
import About from "./pages/About/about.js"
import Contact from "./pages/Contact/contact.js"
import SignIn from "./pages/Sign-In/sign-in.js"
import SignUp from "./pages/Sign-Up/sign-up.js"
import Shop from './pages/Shop/shop.js';
import aaa from "./pages/aaa.js"
import NavBar from "./NavBar/NavBar";
import SideBar from './SideBar/SideBar';
import Footer from './Footer/Footer';

// Stores
import navbarStore from "../stores/navbarStore.js"
import signupStore from "../stores/signupStore.js"
import signinStore from "../stores/signinStore.js"
import authStore from "../stores/authStore.js"
import shopStore from "../stores/shopStore.js"


export default class Routes extends React.Component {

  componentWillMount() {
    authStore.pullUser(); 
  }
  
  render() {
      return (
          <BrowserRouter>
              <div>
                  <Favicon url={require("../images/icons/controller.png")} />
                  <NavBar navbarStore={navbarStore} authStore={authStore}/> 
                  <SideBar navbarStore={navbarStore} authStore={authStore}/>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/contact" exact component={Contact} />
                    <Route
                      path="/shop"
                      exact
                      render={() => <Shop shopStore={shopStore} />}
                    />
                    <Route
                      path="/sign-up"
                      exact
                      render={() => <SignUp signupStore={signupStore} signinStore={signinStore}/>}
                    />
                    <Route
                      path="/sign-in"
                      exact
                      render={() => <SignIn signinStore={signinStore} authStore={authStore}/>}
                    />
                    <Route path="/aaa" exact component={aaa} />
                    <Route component={NotFound}/>
                  </Switch>
                  <Footer />
              </div>
          </BrowserRouter>
          )
      }
}