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
import Cart from './pages/Cart/cart.js';
import aaa from "./pages/aaa.js"
import NavBar from "./NavBar/NavBar";
import CartBar from "./CartBar/cartBar";
import SideBar from './SideBar/SideBar';
import Footer from './Footer/Footer';
import GameDetails from './pages/Shop/Games/gameDetails.js';
import ManageUsers from './pages/ManageUsers/manageUsers.js';
import ManageGames from './pages/ManageGames/manageGames.js';
import OrdersHistory from './pages/OrdersHistory/ordersHistory.js';
import Account from './pages/Account/account.js';
import Chat from './pages/Chat/chat.js';
import CreateGroup from './pages/Chat/Groups/createGroup.js';
import ManageRequests from './pages/Chat/Groups/manageRequests/manageRequests';
import Blog from './pages/Blog/blog.js';
import FullPost from './pages/Blog/fullPost.js';
import AddPost from './pages/Blog/addPost';


// Stores
import navbarStore from "../stores/navbarStore.js";
import cartStore from "../stores/cartStore.js";
import signupStore from "../stores/signupStore.js";
import signinStore from "../stores/signinStore.js";
import authStore from "../stores/authStore.js";
import shopStore from "../stores/shopStore.js";
import userStore from "../stores/userStore.js";
import orderStore from "../stores/orderStore.js";
import chatStore from "../stores/chatStore.js"
import PasswordRecovery from './pages/Sign-In/passwordRecovery.js';
import ResetPass from './pages/Sign-In/forgotPass/reset.js';
import HomeCategoriesStore from "../stores/HomeCategoriesStore.js";
import blogStore from "../stores/blogStore.js";
import passwordRecoveryStore from "../stores/passwordRecoveryStore.js";
import resetStore from '../stores/resetStore.js';
import contactMailStore from '../stores/contactMailStore.js';
import ReactLoading from "react-loading";

import ScrollToTop from 'react-router-scroll-top'

@observer
export default class Routes extends React.Component {

  componentWillMount() {
    authStore.pullUser(); 
    cartStore.pullCart(); 
  }
  render() {
      if (authStore.loading)
        return "";
      return (
          <BrowserRouter>
              <ScrollToTop>
              <div>
                  <Favicon url="/images/icons/controller.png" />
                  <NavBar navbarStore={navbarStore} authStore={authStore} cartStore={cartStore}/>
                  <CartBar navbarStore={navbarStore} cartStore={cartStore}/> 
                  <SideBar navbarStore={navbarStore} authStore={authStore} chatStore={chatStore}/>
                  <Switch>
                  <Route
                      path="/"
                      exact
                      render={() => (
                          <Home HomeCategoriesStore={HomeCategoriesStore}/>
                      )
                    }
                    />
                    <Route
                      path="/forgotPassword"
                      exact
                      render={() => (
                          <PasswordRecovery passwordRecoveryStore={passwordRecoveryStore}/>
                      )
                    }
                    />
                    
                    <Route
                      path="/forgotPassword/reset/:token"
                      exact
                      render={() => (
                          <ResetPass resetPassStore={resetStore} />
                      )
                    }
                    />
                    <Route path="/about" exact component={About} />
                    <Route
                      path="/contact"
                      exact
                      render={() => (
                        <Contact contactMailStore={contactMailStore}/>
                      )
                    }
                    />
                    <Route
                      path="/orders"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined)? 
                          <OrdersHistory orderStore={orderStore} authStore={authStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/account"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined)? 
                          <Account authStore={authStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/chat"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined)? 
                          <Chat chatStore={chatStore}/>
                          :
                          <Redirect to="/sign-in"/>
                      )
                    }
                    />
                    <Route
                      path="/chat/create_group"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined)? 
                          <CreateGroup chatStore={chatStore}/>
                          :
                          <Redirect to="/sign-in"/>
                      )
                    }
                    />
                     <Route
                      path="/chat/groups_management"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined)? 
                          <ManageRequests chatStore={chatStore} authStore={authStore}/>
                          :
                          <Redirect to="/sign-in"/>
                      )
                    }
                    />
                    <Route
                      path="/manage_users"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined && authStore.role == "manager")? 
                          <ManageUsers userStore={userStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/manage_games"
                      exact
                      render={() => (
                        (authStore.currentUser != undefined && authStore.role == "manager")? 
                          <ManageGames gameStore={shopStore}/>
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
                          <Shop HomeCategoriesStore={HomeCategoriesStore} shopStore={shopStore}/>
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
                          <GameDetails shopStore={shopStore} cartStore={cartStore} gameID={req.match.params.gameID}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )}
                    />
                    <Route
                      path="/cart"
                      exact
                      render={() => (
                        authStore.currentUser != undefined ? 
                          <Cart cartStore={cartStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/blog"
                      exact
                      render={() => (
                        authStore.currentUser != undefined ? 
                          <Blog blogStore={blogStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/blog/details/:id"
                      exact
                      render={(req) => (
                        authStore.currentUser != undefined ? 
                          <FullPost id={req.match.params.id}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
                    />
                    <Route
                      path="/blog/post"
                      exact
                      render={() => (
                        authStore.currentUser != undefined ? 
                          <AddPost blogStore={blogStore}/>
                          :
                          <Redirect to="/sign-in"/> 
                      )
                    }
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
                          <SignIn signinStore={signinStore} authStore={authStore} chatStore={chatStore}/>
                          :
                          <Redirect to="/"/> 
                      )}
                    />
                    <Route component={NotFound}/>
                  </Switch>
                  <Footer />
              </div>
              </ScrollToTop>
          </BrowserRouter>
          )
      }
}