import * as React from 'react';
import { connect } from 'react-redux';

import { FormGroup, TextField } from '@material-ui/core';
import { CaButton, CaSnackbar } from 'components';
import { emailRegExp, frontEndValidationErrorsLogin } from 'constes';
import { AppState, LoginUser } from 'store';
import { CloseSnackbar, OpenSnackbar } from 'store/snackbar';
import { isObjectsEqual } from 'utils/isObjectsEqual';

import {
  AuthStatus,
  SnackbarType,
  UserFieldsToLogin,
  transitionDirection
} from 'models';
import { I18n } from 'react-i18next';

import { isEmpty } from './../../utils/isEmpty';

import {
  LoginFormProps,
  LoginFormState,
  initLoginFormState
} from './LoginForm.model';

import './LoginForm.scss';

export class LoginFormComponent extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = initLoginFormState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  public componentWillReceiveProps(nextProps: LoginFormProps): void {
    if (nextProps.status === AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }

    if (!isEmpty(nextProps.errors) && !isObjectsEqual(this.props.errors, nextProps.errors)) {
      this.props.openSnackbar();
    }

  }

  public componentDidMount(): void {
    if (this.props.status === AuthStatus.Authorized) {
      this.props.history.push('/homepage');
    }
  }

  public onChange(event: any): void {
    const target = event.target;

    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value } as LoginFormState);
  }

  public onSubmit(event: any): void {
    event.preventDefault();

    const user: UserFieldsToLogin = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  public checkValidation(): void {
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

    if (emailErrors.length <= 0) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }

    if (passwordErrors.length <= 0) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }

    this.setState({ emailErrors, passwordErrors });
  }

  public onBlur = (field: string) => (evt: any) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
    this.checkValidation();
  }

  public closeSnackbar = () => {
    this.props.closeSnackbar();
  }

  public redToForgetPassword(): void {
    this.props.history.push('/forget-password');
  }

  public render(): JSX.Element {
    const { errors } = this.props;
    const keys = errors && Object.keys(errors);
    return (
      <I18n>
        {
          (t) => (
            <div className='ca-login-form'>
              <CaSnackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={this.props.isSnackbarOpen}
                autoHideDuration={4000}
                handleClose={this.closeSnackbar}
                type={SnackbarType.Error}
                //  transitionComponent = {this.transitionUp}
                transitionDirection={transitionDirection.Down}
                message={
                  <div>
                    {keys && keys.map((k: string) =>
                      (
                        <div>* {errors[k].msg} </div>
                      )
                    )}
                  </div>
                }
              />

              {this.props.children}
              <form onSubmit={this.onSubmit} className='ca-login-form__container'>
                <FormGroup>
                  <TextField
                    id='email'
                    label={t('emailLabel')}
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                    type='email'
                    onBlur={this.onBlur('email')}
                    error={!this.state.isEmailValid && this.state.touched.email}
                  />
                  {!this.state.isEmailValid &&
                    this.state.touched.email &&
                    this.state.emailErrors.map((err, index) => {
                      return (
                        <div className='ca-login-form__error' key={index}>
                          {t(err)}
                        </div>
                      );
                    })}
                </FormGroup>

                <FormGroup>
                  <TextField
                    style={{
                      marginTop: '20px'
                    }}
                    id='password'
                    label={t('passwordLabel')}
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                    type='password'
                    onBlur={this.onBlur('password')}
                    error={!this.state.isPasswordValid && this.state.touched.password}
                  />
                  {!this.state.isPasswordValid &&
                    this.state.touched.password &&
                    this.state.passwordErrors.map((err, index) => {
                      return (
                        <div className='ca-login-form__error' key={index}>
                          {t(err)}
                        </div>
                      );
                    })}
                </FormGroup>
                <div className='ca-login-form__footer'>
                  <CaButton
                    color='primary'
                    type='submit'
                    className='ca-login-form__login-btn'
                    disabled={!this.state.isEmailValid || !this.state.isPasswordValid}
                  >
                    {t('login').toUpperCase()}
                  </CaButton>
                  <div className='ca-login-form__forget-password'>
                    <a href='/#/forget-password' onClick={() => this.redToForgetPassword()}>{t('forget-password')}</a>
                  </div>
                </div>
              </form>
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
  isSnackbarOpen: state.snackbarUi.isOpen
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (user: UserFieldsToLogin) => dispatch(new LoginUser(user)),
  closeSnackbar: () => dispatch(new CloseSnackbar()),
  openSnackbar: () => dispatch(new OpenSnackbar())
});

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
