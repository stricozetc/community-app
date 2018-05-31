import * as React from 'react';
import './root.css';

import logo from './../../logo.svg';

import * as jwt_decode from 'jwt-decode'; 

import {
    HashRouter as Router,
    Route,
  } from 'react-router-dom';

import BattleRegistration from './../BattleRegistration/BattleRegistration';
import { RegistrationForm } from './../RegistrationForm/RegistrationForm';

import { store } from './../../store'

import { LoginForm } from 'components/LoginForm/LoginForm';
import { Landing } from '../Landing/Landing';
import { SetCurrentUser } from './../../store/auth/auth.action';

import { setAuthtoken } from './../../utils/setAuthToken';


import { FrontEndUser } from 'store/auth/interfaces';
import { Dashboard } from '../Dashboard/Dashboard';

import * as Cookies from 'js-cookie';



const token = Cookies.get('jwtToken');
if(token){
  setAuthtoken(token);
  // Decode token and get user info and expiration
  const decoded: FrontEndUser = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(new SetCurrentUser(decoded)); 

  // // Check if expired
  // const currentTime = Date.now() / 1000;
  // if(decoded.exp < currentTime) {
  //   store.dispatch(new LogoutUser()); 
  //   window.location.href = '/login'
  // }
}


export class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Battle Net</h1>
        </header>

        <BattleRegistration/>
        <Router> 
          
          <div className="App">
         
              <Route exact={true} path="/"
                render={(props) =>
                    <Landing {...props} />
                }
              />
              <div className="container">

              <Route exact={true} path="/register"
                render={(props) =>
                    < RegistrationForm {...props}/>
                }
              />

              <Route exact={true} path="/login"
                render={(props) =>
                    <LoginForm {...props} />
                }
              />

              <Route exact={true} path="/dashboard"
                render={(props) =>
                    <Dashboard {...props}/>
                }
              />

              </div>
          </div>
        </Router>
  
      </div>
    );
  }
}
