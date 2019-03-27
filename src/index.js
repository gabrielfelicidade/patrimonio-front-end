import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path='*' component={Main} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
