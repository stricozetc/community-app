import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { emailRegExp, frontEndValidationErrorsLogin } from 'constes';
import { SocialNetworksUser } from 'models';
import { AppState, LoginUser, SocialNetworksLogin } from 'store';

import {
  AuthStatus,
  UserFieldsToLogin,
  UserFieldsToRegister,
} from 'models';

import {
  LoginFormProps,
  LoginFormState,
  initLoginFormState
} from './LoginForm.model';

import './LoginForm.scss';
import { SocNetBlock } from '../SocialNetworksBlock';
import { CaSpinner } from '../Spinner';

export class LoginFormComponent extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = initLoginFormState;
  }

  public componentWillReceiveProps(nextProps: LoginFormProps): void {
    if (nextProps.status === AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }
  }

  public componentDidMount(): void {
    if (this.props.status === AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }
  }

  public onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;

    this.setState({ email });
  }

  public onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;

    this.setState({ password });
  }

  public onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.isValidData()) {
      const user: UserFieldsToLogin = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.loginUser(user);
    }
  }

  public isValidData = (): boolean => {
    let emailErrors: string[] = [];
    let passwordErrors: string[] = [];

    if (!this.state.email) {
      emailErrors.push(frontEndValidationErrorsLogin.email.required);
    } else {
      emailErrors = this.removeElFromArrByValue(
        emailErrors,
        frontEndValidationErrorsLogin.email.required
      );
    }

    if (!this.validateEmail(this.state.email)) {
      emailErrors.push(frontEndValidationErrorsLogin.email.mustBeCorrect);
    } else {
      emailErrors = this.removeElFromArrByValue(
        emailErrors,
        frontEndValidationErrorsLogin.email.mustBeCorrect
      );
    }
    if (!this.state.password) {
      passwordErrors.push(frontEndValidationErrorsLogin.password.required);
    } else {
      passwordErrors = this.removeElFromArrByValue(
        passwordErrors,
        frontEndValidationErrorsLogin.password.required
      );
    }

    if (this.state.password.length < 6) {
      passwordErrors.push(frontEndValidationErrorsLogin.password.min);
    } else {
      passwordErrors = this.removeElFromArrByValue(
        passwordErrors,
        frontEndValidationErrorsLogin.password.min
      );
    }

    this.setState({ emailErrors, passwordErrors });

    if (emailErrors.length <= 0) {
      this.isInputErrorStyle('email');
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
      return false;
    }

    if (passwordErrors.length <= 0) {
      this.setState({ isPasswordValid: true });
    } else {
      this.isInputErrorStyle('password');
      this.setState({ isPasswordValid: false });
      return false;
    }

    return true;
  }

  public isInputErrorStyle = (field: string) => () => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
  }

  public render(): JSX.Element {
    const {
      children
    } = this.props;

    const {
      email,
      password,
      isEmailValid,
      isPasswordValid,
      touched,
      emailErrors,
      passwordErrors,
    } = this.state;

    return (
      <I18n>{(t) => (
        <div className='ca-login-form'>
          {children}
          {this.props.spinnerRun
            ? <CaSpinner isActive={true} />
            : (<form onSubmit={this.onSubmit} className='ca-login-form__container' noValidate={true}>
              <FormGroup>
                <TextField
                  id='email'
                  label={t('emailLabel')}
                  name='email'
                  value={email}
                  onChange={this.onChangeEmail}
                  type='email'
                  error={!isEmailValid && touched.email}
                />
                {!isEmailValid &&
                  emailErrors.map((err, index) => {
                    return (
                      <div className='ca-login-form__error' key={index}>
                        {t(err)}
                      </div>
                    );
                  })}
              </FormGroup>

              <FormGroup>
                <TextField
                  className='ca-login-form__password-field'
                  style={{ marginTop: '20px' }}
                  id='password'
                  label={t('passwordLabel')}
                  name='password'
                  value={password}
                  onChange={this.onChangePassword}
                  type='password'
                  error={!isPasswordValid && touched.password}
                />
                {!isPasswordValid &&
                  passwordErrors.map((err, index) => {
                    return (
                      <div className='ca-login-form__error' key={index}>
                        {t(err)}
                      </div>
                    );
                  })}
              </FormGroup>
              <div className='ca-login-form__button-container'>
                <CaButton
                  color='primary'
                  type='submit'
                  className='ca-login-form__login-btn'
                  disabled={!password || !email}
                >
                  {t('login').toUpperCase()}
                </CaButton>
              </div>
              <SocNetBlock
                history={this.props.history}
                isRestorePasswordVisible={true}
              />
            </form>)
          }

        </div>
      )
      }
      </I18n>
    );
  }

  private validateEmail(email: string): boolean {
    return emailRegExp.test(email);
  }

  private removeElFromArrByValue(arr: string[], value: string): string[] {
    const index = arr.indexOf(value);
    if (index) {
      arr.splice(index, 1);
    }

    return arr;
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
  errors: state.errors,
  spinnerRun: state.auth.spinnerRun
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (user: UserFieldsToRegister) => dispatch(new LoginUser(user)),
  socialNetworksLogin: (socialNetworksUser: SocialNetworksUser) => dispatch(new SocialNetworksLogin(socialNetworksUser))
});

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
