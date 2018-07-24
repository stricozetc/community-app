import './landing.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus } from 'models';
import { AppState } from 'store';

import { LandingProps } from './Landing.model';
import { CaButton } from 'components';

class LandingComponent extends React.Component<LandingProps> {
  public componentDidMount(): void {
    if (this.props.status === AuthStatus.AUTHORIZED) {
      this.props.history.push('/homepage');
    }
  }

  public redToLogin(): void {
    this.props.history.push('/login');
  }

  public redToRegister(): void {
    this.props.history.push('/register');
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.props.children}
        <h2>Landing for Community App</h2>
        <CaButton
          onClick={() => this.redToRegister()}
        >
        Register
        </CaButton>

        <CaButton
          onClick={() => this.redToLogin()}
        >
        Login
        </CaButton>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status
});

export const Landing = connect(
  mapStateToProps,
  {}
)(LandingComponent);
