import * as React from 'react';

import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

import { CaButton } from 'components/Mui/CaButton';
import { CaSpinner } from 'components/Spinner';
import { emailRegExp, frontEndValidationErrorsLogin } from 'constes';
import { RestorePasswordStatus } from 'models';
import { ResetRequest, SendRestoreRequest } from 'store/restore-password';
import { AppState } from 'store/store.config';

import { ForgetPasswordProps, ForgetPasswordState, initForgetPasswordState } from './ForgetPassword.model';

import './ForgetPassword.scss';

class CaForgetPasswordComponent extends React.Component<ForgetPasswordProps, ForgetPasswordState> {
  constructor(props: ForgetPasswordProps) {
    super(props);

    this.state = initForgetPasswordState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  public onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target.value;
    this.setState({ email: target });
  }

  public onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    this.props.sendRestoreRequest(this.state.email);
  }

  public checkValidation(): void {
    let emailErrors: string[] = [];

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

    if (emailErrors.length <= 0) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }

    this.setState({ emailErrors });
  }

  public onBlur = (field: string) => (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      isTouched: true
    });
    this.checkValidation();
  }

  public render(): JSX.Element {
    return (
      <I18n>
        {
          (t) => (
            <div className='ca-forget-password-form'>
              {this.props.status === RestorePasswordStatus.Init ?
                <form onSubmit={this.onSubmit} className='ca-forget-password-form__container'>
                  <FormGroup>
                    <TextField
                      id='email'
                      label={t('emailLabel')}
                      name='email'
                      value={this.state.email}
                      onChange={this.onChange}
                      type='email'
                      onBlur={this.onBlur('email')}
                      error={!this.state.isEmailValid && this.state.isTouched}
                    />
                    {!this.state.isEmailValid &&
                      this.state.isTouched &&
                      this.state.emailErrors.map((err, index) => {
                        return (
                          <div className='ca-forget-password-form__error' key={index}>
                            {t(err)}
                          </div>
                        );
                      })}
                  </FormGroup>
                  <CaButton
                    color='primary'
                    type='submit'
                    className='ca-forget-password-form__login-btn'
                    disabled={!this.state.isEmailValid}
                  >
                    {t('login').toUpperCase()}
                  </CaButton>
                </form> :
                this.props.status === RestorePasswordStatus.Success ?
                  <div className='ca-forget-password-form__confirm-message'>
                    <div className='ca-forget-password-form__message'>{t('email-sent')}</div>
                    <div className='ca-forget-password-form__message'>{t('mail')}{this.state.email}</div>
                  </div> :
                  <CaSpinner isActive={true} />
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendRestoreRequest: (userEmail: string) => dispatch(new SendRestoreRequest(userEmail)),
  resetRequest: () => dispatch(new ResetRequest()),
});

const mapStateToProps = (state: AppState) => ({
  status: state.restorePassword.status,
});

export const CaForgetPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaForgetPasswordComponent);
