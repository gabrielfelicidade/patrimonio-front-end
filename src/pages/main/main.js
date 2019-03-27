import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../home';
import Location from '../location';
import User from '../user';
import Error404 from '../error404';
import FormAquisition from '../formAquisition';
import acquisitionMethod from '../acquisitionMethod/acquisitionMethod';
import MenuBar from '../../components/menuBar';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './main.css';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <MenuBar />
        </header>
        <div className="Main-body">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/localizacao-cadastro" component={Location} />
              <Route path="/usuario" component={User} />
              <Route path="/metodo-aquisicao" component={acquisitionMethod} />
              <Route path="/metodo-aquisicao-cadastro" component={FormAquisition} />
              <Route path="*" component={Error404} />
            </Switch>
          </ BrowserRouter>
        </div>
        <div className="Main-footer">
        </div>
      </div>
    );
  }
}