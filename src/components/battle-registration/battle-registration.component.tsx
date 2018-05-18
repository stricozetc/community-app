import './battle-registration.component.css';

import * as React from 'react';
import * as openSocket from 'socket.io-client';

import { BattleRegistrationProps, BattleRegistrationState } from './battle-registration.model';

export class BattleRegistration extends React.Component<BattleRegistrationProps, BattleRegistrationState> {
    private socket = openSocket('http://localhost:3030');

    private goToBattleHelpMassage: string = 'Press on "Go to the battle" page';
    private waitBattleHelpMassage: string = 'Please, wait other users';
    private goToBattleButtonMassage: string = 'Go to the battle';
    private leaveFromBattleButtonMassage: string = 'Leave form the battle';
    private isStartingBattle: boolean = false;

    constructor(props: any) {
        super(props);

        this.state = {
            helpMassage: this.goToBattleHelpMassage,
            buttonMassage: this.goToBattleButtonMassage,
            countWaitPlayers: 0
        };

        this.socket.on('redirect', (redirectUrl: string) => window.location.replace(redirectUrl));
        this.socket.on('onWaitPlayersJsMarathon', (countWaitPlayers: number) => this.setState(
            prevState => ({ ...prevState, countWaitPlayers })
        ));
    }

    public render(): JSX.Element {
        const { helpMassage, buttonMassage } = this.state;

        return (
            <div className="battle-registration">
                <div className='battle-registration__registration-button'>
                    <button onClick={() => this.onGoBattle()}>{buttonMassage}</button>
                </div>
                <div className='battle-registration__help-message'>
                    {helpMassage} {this.getCountWaitPlayers()}
                </div>
            </div>
        );
    }

    private onGoBattle(): void {
        if (!this.isStartingBattle) {
            this.socket.emit('onJsMarathon');
            this.isStartingBattle = true;

            this.setState(
                prevState => {
                    return { ...prevState, helpMassage: this.waitBattleHelpMassage, buttonMassage: this.leaveFromBattleButtonMassage };
                }
            );
        } else {
            this.socket.emit('onLeaveJsMarathon');
            this.isStartingBattle = false;

            this.setState(
                prevState => {
                    return { ...prevState, helpMassage: this.goToBattleHelpMassage, buttonMassage: this.goToBattleButtonMassage };
                }
            );
        }
    }

    private getCountWaitPlayers(): JSX.Element {
        if (!this.isStartingBattle) {
            return (
                // tslint:disable-next-line:jsx-self-close
                <span></span>
            )
        } else {
            return (
                <span>({this.state.countWaitPlayers}/5)</span>
            )
        }
    }
}
