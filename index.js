import React from 'react';
import { render } from 'react-dom';
import App from './src/app';
import Grid from './src/grid';
import { Router, Route, hashHistory } from 'react-router'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/grid" component={Grid}/>
  </Router>
), document.getElementById('app'))
