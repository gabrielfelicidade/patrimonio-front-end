import React, { Component } from 'react';
import './main.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from '../login';
import Location from '../location';
import Error404 from '../error404';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Login} />
              <Route path="/localizacao" component={Location} />
              <Route path='*' component={Error404} />
            </Switch>
          </ BrowserRouter>
        </header>
        <div className="component-location">Aparecer nos dois</div>
      </div>
    );
  }
}

export default Main;
