import { FormGroup, TextField } from '@material-ui/core';
import * as React from 'react';

import { CaButton } from 'components';
import { frontEndValidationGameRegister, urlRegExp } from 'constes';
import { GameModel, SettingFormType } from 'models';
import { I18n } from 'react-i18next';
import { history, isEmpty } from 'utils';

import { GameFormProps, GameFormState } from './GameForm.model';

import './GameForm.scss';

const MIN_LENGTH_APP_NAME = 3;
const MAX_LENGTH_APP_NAME = 50;
const MIN_LENGTH_APP_DESCRIPTION = 10;
const MAX_LENGTH_APP_DESCRIPTION = 250;
const MIN_COUNT_ROOM_PLAYERS = 1;
const MIN_COUNT_ROOMS = 1;
const MIN_WAITING_TIME = 15;

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
      isAppNameValid: false,
      isDescriptionValid: false,
      isMaxRoomPlayerValid: false,
      isMaxRoomsValid: false,
      isRequestUrlValid: false,
      isMaxWaitingTimeValid: false,
      isRedirectUrlValid: false,
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

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name as 'appName';

    this.setState({ [name]: value } as GameFormState);
  }

  public isValidate(): boolean {
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

    if (this.state.appName.length < MIN_LENGTH_APP_NAME || this.state.appName.length > MAX_LENGTH_APP_NAME) {
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

    if (this.state.description.length < MIN_LENGTH_APP_DESCRIPTION || this.state.description.length > MAX_LENGTH_APP_DESCRIPTION) {
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

    if (this.state.maxRoomPlayer < MIN_COUNT_ROOM_PLAYERS) {
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

    if (this.state.maxRooms < MIN_COUNT_ROOMS) {
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

    if (this.state.maxWaitingTime < MIN_WAITING_TIME) {
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

    if (appNameErrors.length <= 0) {
      this.setState({ isAppNameValid: true });
    } else {
      this.setState({ isAppNameValid: false });
      return false;
    }

    if (descriptionErrors.length <= 0) {
      this.setState({ isDescriptionValid: true });
    } else {
      this.setState({ isDescriptionValid: false });
      return false;
    }

    if (maxRoomPlayerErrors.length <= 0) {
      this.setState({ isMaxRoomPlayerValid: true });
    } else {
      this.setState({ isMaxRoomPlayerValid: false });
      return false;
    }

    if (maxRoomsErrors.length <= 0) {
      this.setState({ isMaxRoomsValid: true });
    } else {
      this.setState({ isMaxRoomsValid: false });
      return false;
    }

    if (requestUrlErrors.length <= 0) {
      this.setState({ isRequestUrlValid: true });
    } else {
      this.setState({ isRequestUrlValid: false });
      return false;
    }

    if (maxWaitingTimeErrors.length <= 0) {
      this.setState({ isMaxWaitingTimeValid: true });
    } else {
      this.setState({ isMaxWaitingTimeValid: false });
      return false;
    }

    if (redirectUrlErrors.length <= 0) {
      this.setState({ isRedirectUrlValid: true });
    } else {
      this.setState({ isRedirectUrlValid: false });
      return false;
    }

    return true;
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.isValidate()) {
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
      history.push('/games');
    }
  }

  public handleBlur = (field: string) => (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
  }

  public render(): JSX.Element {
    const arrayOfInputs = Object.keys(this.props.model);

    return (
      <I18n>
        {
          (t) => (
            <div>
              <form
                className='ca-game-form__container'
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
                        error={!this.state[`${input}`] && this.state.touched[`${input}`]}
                      />
                      {!isEmpty(this.state[`${input}Errors`]) &&

                        this.state[`${input}Errors`].map((err: string, index: number) => {
                          return (
                            <div className='ca-game-form__error' key={index}>
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
                  className='ca-game-form__game-btn'
                   disabled={
                    !this.state.appName ||
                    !this.state.description ||
                    !this.state.maxRoomPlayer ||
                    !this.state.maxRooms ||
                    !this.state.requestUrl ||
                    !this.state.maxWaitingTime ||
                    !this.state.redirectUrl
                  }
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
