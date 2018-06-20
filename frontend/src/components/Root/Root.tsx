import "./root.scss";

import * as Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";
import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { setAuthToken } from "utils";

import {
  FrontEndUser,
  SetCurrentUser,
  store
} from "store";

import { Dashboard } from "../Dashboard";
import { Landing } from "../Landing";
import { LoginForm } from "../LoginForm";
import { RegistrationForm } from "../RegistrationForm";

import logo from "./../../logo.svg";

const token = Cookies.get("jwtToken");
if (token) {
  setAuthToken(token);
  const decoded: FrontEndUser = jwt_decode(token);
  store.dispatch(new SetCurrentUser(decoded));
}

export class Root extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Battle Net</h1>
        </header>

        <Router>
          <div className="App">
            <Route
              exact={true}
              path="/"
              render={props => <Landing {...props} />}
            />
            <div className="container">
              <Route
                exact={true}
                path="/register"
                render={props => <RegistrationForm {...props} />}
              />

              <Route
                exact={true}
                path="/login"
                render={props => <LoginForm {...props} />}
              />

              <Route
                exact={true}
                path="/dashboard"
                render={props => <Dashboard {...props} />}
              />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
