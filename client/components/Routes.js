import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import Favicon from 'react-favicon';
import {observer} from "mobx-react";

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
import GameDetails from './pages/Shop/Games/gameDetails.js'
import ManageUsers from './pages/ManageUsers/manageUsers.js'
// Stores
import navbarStore from "../stores/navbarStore.js"
import signupStore from "../stores/signupStore.js"
import signinStore from "../stores/signinStore.js"
import authStore from "../stores/authStore.js"
import shopStore from "../stores/shopStore.js"
import userStore from "../stores/userStore.js"

import ReactLoading from "react-loading";

@observer
export default class Routes extends React.Component {

  componentWillMount() {
    authStore.pullUser(); 
  }
  
  render() {
      if (authStore.loading)
        return "";
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
                      path="/manage_users"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined && authStore.role == "manager")? 
                          <ManageUsers userStore={userStore} signupStore={signupStore} signinStore={signinStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/shop"
                      exact
                      render={() => (
                        authStore.currentUser != undefined ? 
                          <Shop shopStore={shopStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/shop/games/:gameID"
                      exact
                      render={(req) => (
                        authStore.currentUser != undefined ? 
                          <GameDetails shopStore={shopStore} gameID={req.match.params.gameID}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )}
                    />
                    <Route
                      path="/sign-up"
                      exact
                      render={() => (
                        authStore.currentUser == undefined ? 
                          <SignUp signupStore={signupStore} signinStore={signinStore}/>
                          :
                          <Redirect to="/"/> 
                      )}
                    />
                    <Route
                      path="/sign-in"
                      exact
                      render={() => (
                        authStore.currentUser == undefined ? 
                          <SignIn signinStore={signinStore} authStore={authStore}/>
                          :
                          <Redirect to="/"/> 
                      )}
                    />
                    <Route component={NotFound}/>
                  </Switch>
                  <Footer />
              </div>
          </BrowserRouter>
          )
      }
}