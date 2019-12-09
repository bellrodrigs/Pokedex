import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jQuery as $} from 'jquery';
import './App.css';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';

export default class src extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path = '/' component={Dashboard} />
              <Route exact path = '/pokemon/:pokemonIndex' component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
