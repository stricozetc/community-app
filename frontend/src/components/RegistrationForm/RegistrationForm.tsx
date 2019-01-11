import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { emailRegExp, frontEndValidationErrorsRegister } from 'constes';
import { AuthStatus, SocialNetworksUser, UserFieldsToRegister } from 'models';
import { AppState, RegisterUser, SocialNetworksLogin } from 'store';

import {
  RegistrationFormProps,
  RegistrationFormState,
  initRegistrationFormState
} from './RegistrationForm.model';

import './RegistrationForm.scss';
import { CaSpinner } from '../Spinner';
import { SocNetBlock } from '../SocialNetworksBlock';

export class RegistrationFormComponent extends React.Component<RegistrationFormProps, RegistrationFormState> {
  constructor(props: RegistrationFormProps) {
    super(props);
    this.state = initRegistrationFormState;
  }

  public componentWillReceiveProps(nextProps: RegistrationFormProps): void {
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

  public onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value;

    this.setState({ name });
  }

  public onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;

    this.setState({ password });
  }

  public onChangePasswordToRepeat = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const passwordToRepeat = event.target.value;

    this.setState({ passwordToRepeat });
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.isValidData()) {
      const user: UserFieldsToRegister = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        password2: this.state.passwordToRepeat,
        language: this.props.language,
      };

      this.props.registerUser(user);
    }
  }

  public isValidData = (): boolean => {
    let emailErrors: string[] = [];
    let passwordErrors: string[] = [];
    let nameErrors: string[] = [];
    let passwordToRepeatErrors: string[] = [];

    if (!this.state.email) {
      emailErrors.push(frontEndValidationErrorsRegister.email.required);
    } else {
      emailErrors = this.removeElFromArrByValue(
        emailErrors,
        frontEndValidationErrorsRegister.email.required
      );
    }

    if (!this.validateEmail(this.state.email)) {
      emailErrors.push(frontEndValidationErrorsRegister.email.mustBeCorrect);
    } else {
      emailErrors = this.removeElFromArrByValue(
        emailErrors,
        frontEndValidationErrorsRegister.email.mustBeCorrect
      );
    }

    if (!this.state.name) {
      nameErrors.push(frontEndValidationErrorsRegister.name.required);
    } else {
      nameErrors = this.removeElFromArrByValue(nameErrors, frontEndValidationErrorsRegister.name.required);
    }

    if (this.state.name.length < 2) {
      nameErrors.push(frontEndValidationErrorsRegister.name.min);
    } else {
      nameErrors = this.removeElFromArrByValue(nameErrors, frontEndValidationErrorsRegister.name.min);
    }

    if (!this.state.password) {
      passwordErrors.push(frontEndValidationErrorsRegister.password.required);
    } else {
      passwordErrors = this.removeElFromArrByValue(
        passwordErrors,
        frontEndValidationErrorsRegister.password.required
      );
    }

    if (this.state.password.length < 6) {
      passwordErrors.push(frontEndValidationErrorsRegister.password.min);
    } else {
      passwordErrors = this.removeElFromArrByValue(
        passwordErrors,
        frontEndValidationErrorsRegister.password.min
      );
    }

    if (!this.state.passwordToRepeat) {
      passwordToRepeatErrors.push(frontEndValidationErrorsRegister.passwordToRepeat.required);
    } else {
      passwordToRepeatErrors = this.removeElFromArrByValue(
        passwordToRepeatErrors,
        frontEndValidationErrorsRegister.passwordToRepeat.required
      );
    }

    if (this.state.password !== this.state.passwordToRepeat) {
      passwordToRepeatErrors.push(frontEndValidationErrorsRegister.passwordToRepeat.match);
    } else {
      passwordToRepeatErrors = this.removeElFromArrByValue(
        passwordToRepeatErrors,
        frontEndValidationErrorsRegister.passwordToRepeat.match
      );
    }

    this.setState({ emailErrors, passwordErrors, nameErrors, passwordToRepeatErrors });

    if (emailErrors.length <= 0) {
      this.setState({ isEmailValid: true });
    } else {
      this.isInputErrorStyle('email');
      this.setState({ isEmailValid: false });
      return false;
    }

    if (nameErrors.length <= 0) {
      this.setState({ isNameValid: true });
    } else {
      this.isInputErrorStyle('name');
      this.setState({ isNameValid: false });
      return false;
    }

    if (passwordErrors.length <= 0) {
      this.setState({ isPasswordValid: true });
    } else {
      this.isInputErrorStyle('password');
      this.setState({ isPasswordValid: false });
      return false;
    }

    if (passwordToRepeatErrors.length <= 0) {
      this.setState({ isPasswordToRepeatValid: true });
    } else {
      this.isInputErrorStyle('passwordToRepeat');
      this.setState({ isPasswordToRepeatValid: false });
      return false;
    }

    return true;
  }

  public isInputErrorStyle = (field: string) => (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
  }

  public render(): JSX.Element {
    const {
      isNameValid,
      isPasswordValid,
      isPasswordToRepeatValid,
      isEmailValid,
      touched,
      email,
      password,
      name,
      nameErrors,
      passwordErrors,
      passwordToRepeatErrors,
      passwordToRepeat,
      emailErrors,
    } = this.state;

    const {
      children,
      spinnerRun,
      history,
    } = this.props;
    return (
      <I18n>
        {
          (t) => (
            <div>
              {children}
              {spinnerRun ? <CaSpinner isActive={true} /> :
                (<form
                  onSubmit={this.handleSubmit}
                  className='ca-Registration-form__container'
                  noValidate={true}
                >
                  <FormGroup>
                    <TextField
                      id='email'
                      label={t('emailLabel')}
                      name='email'
                      value={email}
                      onChange={this.onChangeEmail}
                      type='email'
                      className='ca-Registration-form__field'
                      error={!isEmailValid && touched.email}
                    />
                    {!isEmailValid &&
                      emailErrors.map((err, index) => {
                        return (
                          <div className='ca-Registration-form__error' key={index}>
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
                      id='name'
                      label={t('nameLabel')}
                      name='name'
                      value={name}
                      onChange={this.onChangeName}
                      type='text'
                      className='ca-Registration-form__field'
                      error={!isNameValid && touched.name}
                    />
                    {!isNameValid &&
                      nameErrors.map((err, index) => {
                        return (
                          <div className='ca-Registration-form__error' key={index}>
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
                      value={password}
                      onChange={this.onChangePassword}
                      type='password'
                      className='ca-Registration-form__field'
                      error={!isPasswordValid && touched.password}
                    />
                    {!isPasswordValid &&
                      passwordErrors.map((err, index) => {
                        return (
                          <div className='ca-Registration-form__error' key={index}>
                            {t(err)}
                          </div>
                        );
                      })}
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      style={{ marginTop: '20px' }}
                      id='passwordToRepeat'
                      label={t('repeatPasswordLabel')}
                      name='passwordToRepeat'
                      value={passwordToRepeat}
                      onChange={this.onChangePasswordToRepeat}
                      type='password'
                      className='ca-Registration-form__field'
                      error={
                        !isPasswordToRepeatValid &&
                        touched.passwordToRepeat
                      }
                    />

                    {!isPasswordToRepeatValid &&
                      passwordToRepeatErrors.map((err, index) => {
                        return (
                          <div className='ca-Registration-form__error' key={index}>
                            {t(err)}
                          </div>
                        );
                      })}
                  </FormGroup>

                  <CaButton
                    color='primary'
                    type='submit'
                    className='ca-Registration-form__registration-btn'
                    disabled={
                      !email ||
                      !password ||
                      !name ||
                      !passwordToRepeat
                    }
                  >
                    {t('register')}
                  </CaButton>
                  <SocNetBlock
                    history={history}
                    isRestorePasswordVisible={false}
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
  language: state.userSettings.language,
  spinnerRun: state.auth.spinnerRun
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (user: UserFieldsToRegister) => dispatch(new RegisterUser(user)),
  socialNetworksLogin: (socialNetworksUser: SocialNetworksUser) => dispatch(new SocialNetworksLogin(socialNetworksUser))
});

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormComponent);
