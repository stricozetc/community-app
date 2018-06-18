

import * as React from 'react';
import './landing.scss'

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AppState } from 'store';

import { connect } from 'react-redux';


import {LandingProps} from './LandingProps';

class LandingComponent extends React.Component <LandingProps> {

  public componentDidMount(): void {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  public render():  JSX.Element {
    return (
      <div>
        <h2>Landing for Community App</h2>
        <Link to="/register" className="CA-Landing__register-btn">
            <Button variant="raised" color="primary" >
                Register
            </Button>
        </Link>

        <Link to="/login">
            <Button variant="raised" color="primary">
                Login
            </Button>
        </Link>
      </div>
    )
  }
}


const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

export const Landing = connect(
  mapStateToProps,
  {}
)(LandingComponent);
