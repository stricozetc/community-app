import * as React from 'react';
import { connect } from 'react-redux';

import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { CaButton } from 'components';

import { emailRegExp, frontEndValidationErrorsRegister } from 'constes';
import { UserFieldsToRegister } from 'models';
import { AppState, RegisterUser } from 'store';

import {
  RegistrationFormProps,
  RegistrationFormState,
  initRegistrationFormState
} from './RegistrationForm.model';

import './RegistrationForm.scss';

export class RegistrationFormComponent extends React.Component<RegistrationFormProps, RegistrationFormState> {
  constructor(props: any) {
    super(props);
    this.state = initRegistrationFormState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  public handleChange(event: any): void {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value } as RegistrationFormState);
    this.checkValidation();

  }

  public handleSubmit(event: any): void {
    event.preventDefault();

    const user: UserFieldsToRegister = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.passwordToRepeat,
      language: this.props.language,
    };

    this.props.registerUser(user);
  }

  public checkValidation(): void {
    let emailErrors: string[] = [];
    let passwordErrors: string[] = [];
    let nameErrors: string[] = [];

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

    if (emailErrors.length <= 0) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }

    if (nameErrors.length <= 0) {
      this.setState({ isNameValid: true });
    } else {
      this.setState({ isNameValid: false });
    }

    if (passwordErrors.length <= 0) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }

    this.setState({ emailErrors, passwordErrors, nameErrors });
  }

  public handleBlur = (field: string) => (evt: any) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
    this.checkValidation();
  }

  public render(): JSX.Element {


    return (
      <I18n>
        {
          (t) => (
            <div>

              {this.props.children}
              <form
                onSubmit={this.handleSubmit}
                className='ca-Registration-form__container'
              >
                <FormGroup>
                  <TextField
                    id='email'
                    label={t('emailLabel')}
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    type='email'
                    className='ca-Registration-form__field'
                    onBlur={this.handleBlur('email')}
                    error={!this.state.isEmailValid && this.state.touched.email}
                  />
                  {!this.state.isEmailValid &&
                    this.state.touched.email &&
                    this.state.emailErrors.map((err, index) => {
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
                    value={this.state.name}
                    onChange={this.handleChange}
                    type='text'
                    className='ca-Registration-form__field'
                    onBlur={this.handleBlur('name')}
                    error={!this.state.isNameValid && this.state.touched.name}
                  />
                  {!this.state.isNameValid &&
                    this.state.touched.name &&
                    this.state.nameErrors.map((err, index) => {
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
                    value={this.state.password}
                    onChange={this.handleChange}
                    type='password'
                    className='ca-Registration-form__field'
                    onBlur={this.handleBlur('password')}
                    error={!this.state.isPasswordValid && this.state.touched.password}
                  />
                  {!this.state.isPasswordValid &&
                    this.state.touched.password &&
                    this.state.passwordErrors.map((err, index) => {
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
                    value={this.state.passwordToRepeat}
                    onChange={this.handleChange}
                    type='password'
                    className='ca-Registration-form__field'
                    onBlur={this.handleBlur('passwordToRepeat')}
                    error={
                      this.state.touched.password &&
                      this.state.touched.passwordToRepeat &&
                      this.state.password !== this.state.passwordToRepeat
                    }
                  />

                  {this.state.touched.password &&
                    this.state.touched.passwordToRepeat &&
                    this.state.password !== this.state.passwordToRepeat && (
                      <div className='ca-Registration-form__error'>
                        {t('matchPassword')}
                      </div>
                    )}
                </FormGroup>

                <CaButton
                  color='primary'
                  type='submit'
                  className='ca-Registration-form__registration-btn'
                  disabled={
                    !this.state.isEmailValid ||
                    !this.state.isPasswordValid ||
                    !this.state.isNameValid ||
                    this.state.password !== this.state.passwordToRepeat
                  }
                >
                  {t('register')}
                </CaButton>
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
  language: state.userSettings.language
});

const mapDispatchToProps = (dispatch: any) => ({
  registerUser: (user: UserFieldsToRegister) => dispatch(new RegisterUser(user)),
});

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormComponent);
