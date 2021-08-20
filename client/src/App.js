import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import VerifyMail from './components/VerifyMail/VerifyMail';
import HelpForm from './components/HelpForm'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/verify/:token">
            <VerifyMail/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/helpform">
            <HelpForm/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
