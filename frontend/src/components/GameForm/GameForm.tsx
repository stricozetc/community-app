import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';

import { frontEndValidationGameRegister } from 'constes';
import { GameModel, SettingFormType } from 'models';
import * as React from 'react';
import { history } from 'utils';


import { GameFormProps, GameFormState } from './GameForm.model';


export class GameForm extends React.Component<GameFormProps, GameFormState> {
     constructor(props: GameFormProps) {
        super(props);
        this.state = props.model;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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
          descriptionErrors.push(frontEndValidationGameRegister.appName.required);
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

    public handleSubmit(event: any): void {
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


        if (this.props.config === SettingFormType.editGame) {
            game = Object.assign(game, {id: this.props.id});
        }

        this.props.submit(game);
        history.push('/my-games');
      }

    public render(): JSX.Element {
        const arrayOfInputs = Object.keys(this.props.model);

        return(
           <div>
               <form
                className='ca-Registration-form__container'
                onSubmit={this.handleSubmit}
               >
                <h2>SETTINGS FORM</h2>
               {arrayOfInputs.map(input => {
                   return(
                        <FormGroup key={input}>
                            <TextField
                                style={{
                                    marginTop: '20px'
                                }}
                                id={input}
                                label={input}
                                name={input}
                                value={this.state[`${input}`]}
                                onChange={this.handleChange}
                                type={(['maxRoomPlayer', 'maxRooms', 'maxWaitingTime'].indexOf(`${input}`) + 1) ? 'number' : 'text'}
                            />
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
