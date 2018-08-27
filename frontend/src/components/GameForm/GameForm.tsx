import { FormGroup, TextField } from '@material-ui/core';
import * as React from 'react';

import { CaButton } from 'components';
import { frontEndValidationGameRegister, urlRegExp } from 'constes';
import { GameModel, SettingFormType } from 'models';
import { I18n } from 'react-i18next';
import { history, isEmpty } from 'utils';

import { GameFormProps, GameFormState } from './GameForm.model';

export class GameForm extends React.Component<GameFormProps, GameFormState> {
  constructor(props: GameFormProps) {
    super(props);
    this.state = {
      ...props.model,
      appNameErrors: [],
      descriptionErrors: [],
      maxRoomPlayerErrors: [],
      maxRoomsErrors: [],
      requestUrlErrors: [],
      maxWaitingTimeErrors: [],
      redirectUrlErrors: [],
      touched: {
        appName: false,
        description: false,
        maxRoomPlayer: false,
        maxRooms: false,
        requestUrl: false,
        maxWaitingTime: false,
        redirectUrl: false
      }
    };
  }
  /* React.ChangeEvent<HTMLInputElement> */
  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name as 'appName';

    this.setState({ [name]: value } as GameFormState);
    this.checkValidation();
  }

  public checkValidation(): void {
    let appNameErrors: string[] = [];
    let descriptionErrors: string[] = [];
    let maxRoomPlayerErrors: string[] = [];
    let maxRoomsErrors: string[] = [];
    let requestUrlErrors: string[] = [];
    let maxWaitingTimeErrors: string[] = [];
    let redirectUrlErrors: string[] = [];

    if (!this.state.appName) {
      appNameErrors.push(frontEndValidationGameRegister.appName.required);
    } else {
      appNameErrors = this.removeElFromArrByValue(
        appNameErrors,
        frontEndValidationGameRegister.appName.required
      );
    }

    if (this.state.appName.length < 3 || this.state.appName.length > 50) {
      appNameErrors.push(frontEndValidationGameRegister.appName.length);
    } else {
      appNameErrors = this.removeElFromArrByValue(appNameErrors, frontEndValidationGameRegister.appName.length);
    }

    if (!this.state.description) {
      descriptionErrors.push(frontEndValidationGameRegister.description.required);
    } else {
      descriptionErrors = this.removeElFromArrByValue(
        descriptionErrors,
        frontEndValidationGameRegister.description.required
      );
    }

    if (this.state.description.length < 10 || this.state.description.length > 250) {
      descriptionErrors.push(frontEndValidationGameRegister.description.length);
    } else {
      descriptionErrors = this.removeElFromArrByValue(descriptionErrors, frontEndValidationGameRegister.description.length);
    }

    if (!this.state.maxRoomPlayer) {
      maxRoomPlayerErrors.push(frontEndValidationGameRegister.maxRoomPlayer.required);
    } else {
      maxRoomPlayerErrors = this.removeElFromArrByValue(
        maxRoomPlayerErrors,
        frontEndValidationGameRegister.maxRoomPlayer.required
      );
    }

    if (this.state.maxRoomPlayer < 2) {
      maxRoomPlayerErrors.push(frontEndValidationGameRegister.maxRoomPlayer.count);
    } else {
      maxRoomPlayerErrors = this.removeElFromArrByValue(maxRoomPlayerErrors, frontEndValidationGameRegister.maxRoomPlayer.count);
    }

    if (!this.state.maxRooms) {
      maxRoomsErrors.push(frontEndValidationGameRegister.maxRooms.required);
    } else {
      maxRoomsErrors = this.removeElFromArrByValue(
        maxRoomsErrors,
        frontEndValidationGameRegister.maxRooms.required
      );
    }

    if (this.state.maxRooms < 1) {
      maxRoomsErrors.push(frontEndValidationGameRegister.maxRooms.count);
    } else {
      maxRoomsErrors = this.removeElFromArrByValue(
        maxRoomsErrors,
        frontEndValidationGameRegister.maxRooms.count
      );
    }

    if (!this.state.maxWaitingTime) {
      maxWaitingTimeErrors.push(frontEndValidationGameRegister.maxWaitingTime.required);
    } else {
      maxWaitingTimeErrors = this.removeElFromArrByValue(
        maxWaitingTimeErrors,
        frontEndValidationGameRegister.maxWaitingTime.required
      );
    }

    if (this.state.maxWaitingTime < 15) {
      maxWaitingTimeErrors.push(frontEndValidationGameRegister.maxWaitingTime.mustBeCorrect);
    } else {
      maxWaitingTimeErrors = this.removeElFromArrByValue(
        maxWaitingTimeErrors,
        frontEndValidationGameRegister.maxWaitingTime.mustBeCorrect);
    }

    if (!this.state.requestUrl) {
      requestUrlErrors.push(frontEndValidationGameRegister.requestUrl.required);
    } else {
      requestUrlErrors = this.removeElFromArrByValue(
        requestUrlErrors,
        frontEndValidationGameRegister.requestUrl.required
      );
    }

    if (!this.validateUrl(this.state.requestUrl)) {
      requestUrlErrors.push(frontEndValidationGameRegister.requestUrl.mustBeCorrect);
    } else {
      requestUrlErrors = this.removeElFromArrByValue(
        requestUrlErrors,
        frontEndValidationGameRegister.requestUrl.mustBeCorrect
      );
    }

    if (!this.state.redirectUrl) {
      redirectUrlErrors.push(frontEndValidationGameRegister.redirectUrl.required);
    } else {
      redirectUrlErrors = this.removeElFromArrByValue(
        redirectUrlErrors,
        frontEndValidationGameRegister.redirectUrl.required
      );
    }

    if (!this.validateUrl(this.state.redirectUrl)) {
      redirectUrlErrors.push(frontEndValidationGameRegister.redirectUrl.mustBeCorrect);
    } else {
      redirectUrlErrors = this.removeElFromArrByValue(
        redirectUrlErrors,
        frontEndValidationGameRegister.redirectUrl.mustBeCorrect
      );
    }

    this.setState({
      appNameErrors,
      descriptionErrors,
      maxRoomPlayerErrors,
      maxRoomsErrors,
      requestUrlErrors,
      maxWaitingTimeErrors,
      redirectUrlErrors
    });
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let game: GameModel = {
      userId: this.props.userId,
      appName: this.state.appName,
      description: this.state.description,
      maxRoomPlayer: this.state.maxRoomPlayer,
      maxRooms: this.state.maxRooms,
      requestUrl: this.state.requestUrl,
      maxWaitingTime: this.state.maxWaitingTime,
      redirectUrl: this.state.redirectUrl,
      registrationEventName: 'on' + this.state.appName,
      leaveEventName: 'onLeave' + this.state.appName,
      updateRoomsInfoEventName: 'onUpdateRoomsInfo' + this.state.appName,
      notifyCountdown: 'onNotifyCountdown' + this.state.appName,

      approve: true
    };

    if (this.props.config === SettingFormType.EditGame) {
      game = Object.assign(game, { id: this.props.id });
    }

    this.props.submit(game);
    history.push('/my-games');
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

  public render(): JSX.Element {
    const arrayOfInputs = Object.keys(this.props.model);

    return (
      <I18n>
        {
          (t) => (
            <div>
              <form
                className='ca-Registration-form__container'
                onSubmit={this.handleSubmit}
              >
                <h2>SETTINGS FORM</h2>
                {arrayOfInputs.map((input: string) => { // keys of received object
                  return (
                    <FormGroup key={input}>
                      <TextField
                        style={{
                          marginTop: '20px'
                        }}
                        id={input}
                        label={input === 'maxWaitingTime' ? input + ' (minutes)' : input}
                        name={input}
                        value={this.state[`${input}`]}
                        onChange={this.handleChange}
                        type={(['maxRoomPlayer', 'maxRooms', 'maxWaitingTime'].indexOf(`${input}`) + 1) ? 'number' : 'text'}
                        onBlur={this.handleBlur(`${input}`)}
                        error={!this.state[`${input}`] && this.state.touched[`${input}`]}
                      />
                      {!isEmpty(this.state[`${input}Errors`]) &&
                        this.state.touched[input] &&
                        this.state[`${input}Errors`].map((err: string, index: number) => {
                          return (
                            <div className='ca-Registration-form__error' key={index}>
                              {t(err)}
                            </div>
                          );
                        })}
                    </FormGroup>
                  );
                })}
                <CaButton
                  color='primary'
                  type='submit'
                  className='ca-Registration-form__registration-btn'
                >
                  {this.props.config}
                </CaButton>
              </form>
            </div>
          )
        }
      </I18n>
    );
  }

  private validateUrl(url: string): boolean {
    return urlRegExp.test(url);
  }

  private removeElFromArrByValue(arr: string[], value: string): string[] {
    const index = arr.indexOf(value);
    if (index) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
