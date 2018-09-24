import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { emailRegExp, frontEndValidationErrorsRegister } from 'constes';
import { UserFieldsToRegister, SocialNetworksUser, GoogleSuccessResponse, GoogleErrorResponse, VkSuccessResponse } from 'models';
import { AppState, RegisterUser, SocialNetworksLogin } from 'store';

import {
  RegistrationFormProps,
  RegistrationFormState,
  initRegistrationFormState
} from './RegistrationForm.model';

import './RegistrationForm.scss';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { getCurrentLanguageFromLocalStorage } from 'utils';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { SocNetBlock } from '../SocialNetworksBlock';

export class RegistrationFormComponent extends React.Component<RegistrationFormProps, RegistrationFormState> {
  constructor(props: RegistrationFormProps) {
    super(props);
    this.state = initRegistrationFormState;
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

    const user: UserFieldsToRegister = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.passwordToRepeat,
      language: this.props.language,
    };

    this.props.registerUser(user);
  }

  public checkValidation = (): void => {
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

  public handleBlur = (field: string) => (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
    this.checkValidation();
  }

  public successResponseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    let data: GoogleSuccessResponse = response as GoogleSuccessResponse;
    const user: SocialNetworksUser = {
      email: data.profileObj.email,
      language: getCurrentLanguageFromLocalStorage(),
      name: data.profileObj.name,
      accessToken: data.accessToken,
    };

    this.props.socialNetworksLogin(user);
  }

  public errorResponseGoogle = (response: GoogleErrorResponse) => {
    console.log(response);
  }

  public responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response);
    const user: SocialNetworksUser = {
      email: response.email,
      language: getCurrentLanguageFromLocalStorage(),
      name: response.name,
      accessToken: response.accessToken,
    };

    this.props.socialNetworksLogin(user);
  }

  public successResponseVk = (response: VkSuccessResponse, email: string) => {
    console.log(response);
    const user: SocialNetworksUser = {
      email: email,
      language: getCurrentLanguageFromLocalStorage(),
      name: response.first_name + ' ' + response.last_name,
      accessToken: response.hash,
    };

    this.props.socialNetworksLogin(user);
  }

  public handleCloseVkDialog = () => {
    this.setState({ isVkDialogOpen: false });
  }

  public handleOpenVkDialog = () => {
    this.setState({ isVkDialogOpen: true });
  }

  public redToRegistratePage(): void {
    this.props.history.push('/register');
  }

  public redToForgetPassword(): void {
    this.props.history.push('/forget-password');
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
                    onChange={this.onChangeEmail}
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
                    onChange={this.onChangeName}
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
                    onChange={this.onChangePassword}
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
                    onChange={this.onChangePasswordToRepeat}
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
                <div className='ca-login-form__form-text'>{t('loginWithSocialNetwork')}</div>
            {/* <div className='ca-login-form__socials-btn'>
              <div className='ca-login-form__socials-btn-container'> */}
                {/* isn't work without https on public host, and work on local host with http */}
                {/* <FacebookLogin
                  appId={configFile.frontEnd.facebookApi.id}
                  fields='name,email'
                  callback={this.responseFacebook}
                  cssClass='ca-login-form__facebook-btn'
                  textButton=''
                  icon='ca-login-form__custom-facebook'
                />
                <div className='ca-login-form__google-btn'>
                  <GoogleLogin
                    className='ca-login-form__custom-google'
                    tag='i'
                    buttonText=''
                    clientId={configFile.frontEnd.googleApi.id}
                    onSuccess={this.successResponseGoogle}
                    onFailure={this.errorResponseGoogle}
                  />
                </div>
                <div
                  className='ca-login-form__vk-btn'
                  onClick={this.handleOpenVkDialog}
                >
                  <i className='ca-login-form__custom-vk'></i>
                </div>
              </div>
              <VkDialog
                apiId={configFile.frontEnd.vkApi.id}
                className={'ca-login-form__vk-dialog'}
                open={this.state.isVkDialogOpen}
                onClose={this.handleCloseVkDialog}
                onSuccess={
                  (response: VkSuccessResponse, email: string) =>
                    this.successResponseVk(response, email)
                }
              />
            </div>            
              <div className='ca-login-form__form-linked-text'>
                {t('forgot-password')}
              </div>
              <div className='ca-login-form__form-linked-text'>
                {t('register')}
              </div> */}
              <SocNetBlock
              history={this.props.history}
              />
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (user: UserFieldsToRegister) => dispatch(new RegisterUser(user)),
  socialNetworksLogin: (socialNetworksUser: SocialNetworksUser) => dispatch(new SocialNetworksLogin(socialNetworksUser))
});

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormComponent);
