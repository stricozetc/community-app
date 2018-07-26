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
      <div className='ca-landing'>
        {this.props.children}
        <div className='ca-landing__container'>
          <h2 className='ca-landing__title'>Landing for Community App</h2>
          <div className='ca-landing__buttons-container'>
            <CaButton
              className='ca-landing__register-btn'
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
        </div>
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
