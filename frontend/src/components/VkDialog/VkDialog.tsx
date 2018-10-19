import * as React from 'react';
import { I18n } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { emailRegExp, frontEndValidationErrorsLogin } from 'constes';

import { CaButton } from 'components';
import { FormGroup, TextField } from '@material-ui/core';
import { VkDialogProps, VkDialogState, initVkDialogState } from './VkDialog.model';
import { createStyled } from 'utils';
import { VkSuccessResponse } from 'models';

import VK, { Auth } from 'react-vk';

import { styles } from './VkDialog.styles';

const Styled = createStyled(styles);

export class VkDialog extends React.Component<VkDialogProps, VkDialogState> {
  constructor(props: VkDialogProps) {
    super(props);

    this.state = initVkDialogState;
  }

  public onBlur = (field: string) => (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
    this.checkValidation();
  }

  public checkValidation = (): void => {
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

  public onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;

    this.setState({ email });
  }

  public handleCloseVkWindow = () => {
    this.setState({ isOpenVkWidget: false });
  }

  public handleOpenVkWindow = () => {
    this.setState({ isOpenVkWidget: true });
  }

  public clearEmailState = () => {
    this.setState({ isOpenVkWidget: false });
    this.props.onClose();
  }

  public render(): JSX.Element {
    const {
      onSuccess,
      open,
      apiId
    } = this.props;

    const {
      email,
      touched,
      emailErrors,
      isEmailValid,
      isOpenVkWidget
    } = this.state;

    return (
      <Styled>{({ classes }) => (
        <I18n>{t => (
          <Dialog
            open={open}
            onClose={this.clearEmailState}
            className={classes.inputButtonColor}
          >
            <DialogContent className={classes.content}>
              {!isOpenVkWidget
                ? <>
                  <FormGroup>
                    <div className='ca-login-form__vk-email-warning'>{t('vkEmailWarningForAuth')}</div>
                    <TextField
                      id='email'
                      label={t('emailLabel')}
                      name='email'
                      value={email}
                      onChange={this.onChangeEmail}
                      type='email'
                      onBlur={this.onBlur('email')}
                      error={!isEmailValid && touched.email}
                      className={classes.inputButtonColor}
                    />
                    {!isEmailValid &&
                      touched.email &&
                      emailErrors.map((err, index) => {
                        return (
                          <div className={classes.vkDialogErr} key={index}>
                            {t(err)}
                          </div>
                        );
                      })}
                  </FormGroup>
                  <div className='ca-login-form__button-container'>
                    <CaButton
                      color='primary'
                      className='ca-login-form__login-btn'
                      disabled={!isEmailValid}
                      onClick={this.handleOpenVkWindow}
                    >
                      {t('login').toUpperCase()}
                    </CaButton>
                  </div>
                </>
                : <VK apiId={apiId}>
                  <Auth options={{
                    onAuth: (response: VkSuccessResponse) =>
                      onSuccess(response, email)
                  }} />
                </VK>
              }
            </DialogContent>
          </Dialog>)}
        </I18n>)}
      </Styled>
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
