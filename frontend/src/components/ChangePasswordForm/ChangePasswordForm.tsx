import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { frontEndValidationErrorsChangePassword as possibleErrors } from 'constes';
import * as React from 'react';
import { I18n } from 'react-i18next';
import { FieldsToChangePassword } from 'store/userSettings/interfaces';

import {
  ChangePasswordFormProps,
  ChangePasswordFormState,
  initState
} from './ChangePasswordForm.model';
import './ChangePasswordForm.scss';

export class ChangePasswordForm extends React.Component<
  ChangePasswordFormProps,
  ChangePasswordFormState
  > {
  constructor(props: ChangePasswordFormProps) {
    super(props);

    this.state = initState;
  }

  public onChangeOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldPassword = event.target.value;

    this.setState({ oldPassword });
  }

  public onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;

    this.setState({ newPassword });
  }

  public onChangeRepeatNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const repeatNewPassword = event.target.value;

    this.setState({ repeatNewPassword });
  }

  public checkValidation = () => {
    let oldPasswordErrors: string[] = [];
    let newPasswordErrors: string[] = [];
    let repeatNewPasswordErrors: string[] = [];

    if (!this.state.oldPassword) {
      oldPasswordErrors.push(possibleErrors.oldPassword.required);
    } else {
      oldPasswordErrors = this.removeElFromArrByValue(
        oldPasswordErrors,
        possibleErrors.oldPassword.required
      );
    }

    if (!this.state.newPassword) {
      newPasswordErrors.push(possibleErrors.newPassword.required);
    } else {
      newPasswordErrors = this.removeElFromArrByValue(
        newPasswordErrors,
        possibleErrors.newPassword.required
      );
    }

    if (!this.state.repeatNewPassword) {
      repeatNewPasswordErrors.push(possibleErrors.repeatNewPassword.required);
    } else {
      repeatNewPasswordErrors = this.removeElFromArrByValue(
        repeatNewPasswordErrors,
        possibleErrors.repeatNewPassword.required
      );
    }

    if (this.state.oldPassword.length < 6) {
      oldPasswordErrors.push(possibleErrors.oldPassword.min);
    } else {
      oldPasswordErrors = this.removeElFromArrByValue(
        oldPasswordErrors,
        possibleErrors.oldPassword.min
      );
    }

    if (this.state.newPassword.length < 6) {
      newPasswordErrors.push(possibleErrors.newPassword.min);
    } else {
      newPasswordErrors = this.removeElFromArrByValue(
        newPasswordErrors,
        possibleErrors.newPassword.min
      );
    }

    if (this.state.repeatNewPassword.length < 6) {
      repeatNewPasswordErrors.push(possibleErrors.repeatNewPassword.min);
    } else {
      repeatNewPasswordErrors = this.removeElFromArrByValue(
        repeatNewPasswordErrors,
        possibleErrors.repeatNewPassword.min
      );
    }

    if (
      this.state.touched.newPassword &&
      this.state.touched.repeatNewPassword &&
      this.state.newPassword !== this.state.repeatNewPassword
    ) {
      repeatNewPasswordErrors.push(possibleErrors.repeatNewPassword.mustMatch);
    } else {
      repeatNewPasswordErrors = this.removeElFromArrByValue(
        repeatNewPasswordErrors,
        possibleErrors.repeatNewPassword.mustMatch
      );
    }

    if (oldPasswordErrors.length <= 0) {
      this.setState({ isOldPasswordValid: true });
    } else {
      this.setState({ isOldPasswordValid: false });
    }

    if (newPasswordErrors.length <= 0) {
      this.setState({ isNewPasswordValid: true });
    } else {
      this.setState({ isNewPasswordValid: false });
    }

    if (repeatNewPasswordErrors.length <= 0) {
      this.setState({ isRepeatNewPasswordValid: true });
    } else {
      this.setState({ isRepeatNewPasswordValid: false });
    }

    this.setState({
      oldPasswordErrors,
      newPasswordErrors,
      repeatNewPasswordErrors
    });
  }

  public onBlur = (field: string) => (evt: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
    this.checkValidation();
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields: FieldsToChangePassword = {
      userId: this.props.user && this.props.user.id,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      repeatNewPassword: this.state.repeatNewPassword
    };

    this.props.submit(fields);
  }

  public render(): JSX.Element {
    return (
      <I18n>
        {t => (
          <div className='ca-change-password-form'>
            {this.props.children}
            <form
              onSubmit={this.handleSubmit}
              className='ca-change-password-form__container'
            >
              <FormGroup>
                <TextField
                  id='oldPassword'
                  label={t('oldPasswordLabel')}
                  name='oldPassword'
                  value={this.state.oldPassword}
                  onChange={this.onChangeOldPassword}
                  type='password'
                  onBlur={this.onBlur('oldPassword')}
                  error={
                    !this.state.isOldPasswordValid &&
                    this.state.touched.oldPassword
                  }
                />
                {!this.state.isOldPasswordValid &&
                  this.state.touched.oldPassword &&
                  this.state.oldPasswordErrors.map((err, index) => {
                    return (
                      <div
                        className='ca-change-password-form__error'
                        key={index}
                      >
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
                  className='ca-change-password-form__password-field'
                  id='newPassword'
                  label={t('newPasswordLabel')}
                  name='newPassword'
                  value={this.state.newPassword}
                  onChange={this.onChangeNewPassword}
                  type='password'
                  onBlur={this.onBlur('newPassword')}
                  error={
                    !this.state.isNewPasswordValid &&
                    this.state.touched.newPassword
                  }
                />
                {!this.state.isNewPasswordValid &&
                  this.state.touched.newPassword &&
                  this.state.newPasswordErrors.map((err, index) => {
                    return (
                      <div
                        className='ca-change-password-form__error'
                        key={index}
                      >
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
                  className='ca-change-password-form__password-field'
                  id='repeatNewPassword'
                  label={t('repeatNewPasswordLabel')}
                  name='repeatNewPassword'
                  value={this.state.repeatNewPassword}
                  onChange={this.onChangeRepeatNewPassword}
                  type='password'
                  onBlur={this.onBlur('repeatNewPassword')}
                  error={
                    !this.state.isRepeatNewPasswordValid &&
                    this.state.touched.repeatNewPassword
                  }
                />
                {!this.state.isRepeatNewPasswordValid &&
                  this.state.touched.repeatNewPassword &&
                  this.state.repeatNewPasswordErrors.map((err, index) => {
                    return (
                      <div
                        className='ca-change-password-form__error'
                        key={index}
                      >
                        {t(err)}
                      </div>
                    );
                  })}
              </FormGroup>

              <CaButton
                color='primary'
                type='submit'
                className='ca-change-password-form__login-btn'
                disabled={
                  !this.state.isOldPasswordValid ||
                  !this.state.isNewPasswordValid ||
                  !this.state.isRepeatNewPasswordValid
                }
              >
                {t('changePasswordLabel')}
              </CaButton>
              {this.props.changePasswordStatus === 2 && (
                <div className='ca-change-password-form__success'>
                  {t('passwordChangedButton')}
                </div>
              )}
            </form>
          </div>
        )}
      </I18n>
    );
  }

  private removeElFromArrByValue(arr: string[], value: string): string[] {
    const index = arr.indexOf(value);
    if (index) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
