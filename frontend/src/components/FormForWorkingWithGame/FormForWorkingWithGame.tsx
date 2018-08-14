import { FormGroup, TextField } from '@material-ui/core';
import { CaButton } from 'components';
import { MyGameModel } from 'models';
import * as React from 'react';
import { history } from 'utils';

import { FormForAddingNewGameState } from './FormForWorkingWithGame.model';

export class FormForWorkingWithGame extends React.Component<any, FormForAddingNewGameState> {
     constructor(props: any) {
        super(props);
        this.state = props.model;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value } as FormForAddingNewGameState);
    }

    public handleSubmit(event: any): void {
        event.preventDefault();

        let game: MyGameModel = {
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
          notifyCountdown: 'onNotifyCountdown' + this.state.appName
        };

        if (this.props.config === 'Edit Game') {
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
}
