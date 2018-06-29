import './root.scss';

import * as Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';
import * as React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import { setAuthToken } from 'utils';

import { FrontEndUser, SetCurrentUser, store } from 'store';

import { Landing } from 'components/Landing';
import { LoginForm } from 'components/LoginForm';
import { RegistrationForm } from 'components/RegistrationForm';

import { CaHomePage } from 'components/HomePage';

import { AppState, LogoutUser } from 'store';

import { connect } from 'react-redux';

import { CaStatisticPage } from 'components/Statistic';

import { RootProps } from './Root.model';

const token = Cookies.get('jwtToken');
if (token) {
  setAuthToken(token);
  const decoded: FrontEndUser = jwt_decode(token);
  store.dispatch(new SetCurrentUser(decoded));
}

export class RootComponent extends React.Component<RootProps> {
  public render(): JSX.Element {
    return (
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
              path="/homepage"
              render={props => <Redirect to="/battles" />}
            />

            <Route
              exact={true}
              path="/statistics"
              render={props => <CaStatisticPage {...props} />}
            />

            <Route
              exact={true}
              path="/battles"
              render={props => <CaHomePage {...props} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser())
});

export const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent);
