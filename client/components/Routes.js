import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom'; 

import Home from "./pages/Home"
import aaa from "./pages/aaa"
import NavBar from './NavBar';
import Footer from './Footer';

export default class Routes extends React.Component {
    render() {
      return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/aaa" component={aaa}/>
          </Switch>
          <Footer/>
        </div>      
      </BrowserRouter>
      )
    }
}
