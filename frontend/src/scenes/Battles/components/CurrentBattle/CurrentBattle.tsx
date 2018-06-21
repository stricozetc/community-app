import * as React from 'react';

import { CaButton } from 'components/form-controls/Button';
import { Countdown } from 'components/Countdown';

import { Game } from 'components/GameCard';

import './current-battle.scss';

import swordImage from 'assets/sword.svg';
import userImage from 'assets/user-small.svg';
import clockImage from 'assets/clock-small.svg';

interface Props {
  waitBattlePlayersCountAction: number;
  battleName: string;
  countdown: number;
  history: any;
  games: Game[];

  leaveBattleAction(payload: string): void;

  logoutUser(): void;
}

export class CurrentBattleComponent extends React.Component<Props> {
  public logoutUser(): void {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  public getGameIndex(): number {
    const currentRoute = this.props.history.location.pathname;
    const test = new RegExp(/\d+/);
    const foundNumber = test.exec(currentRoute) || ["0"];

    return parseInt(foundNumber[0], 0);
  }

  public isGameFull(): boolean {
    const maxRoomPlayers = this.props.games && this.props.games.length ?
      this.props.games[this.getGameIndex()].maxPlayersInRoom : 0;
    return this.props.waitBattlePlayersCountAction === maxRoomPlayers;
  }

  public render(): JSX.Element {
    const { battleName, countdown, waitBattlePlayersCountAction, leaveBattleAction } = this.props;

    return (
      <section className="ca-current-battle">
        {this.props.children}
        <div className="ca-current-battle__content">
          <div className="ca-current-battle__header">
            <div className="ca-current-battle__logo">
              <img src={swordImage} alt="Can not found User img"/>
            </div>
            <div className="ca-current-battle__header-text">
              <div className="ca-current-battle__title">
                {battleName}
              </div>
              <div className="ca-current-battle__sub-title">
                Some description about game
              </div>
            </div>
          </div>

          <div className="ca-current-battle__time-line">
            <div className="ca-current-battle__time">
              <span className="ca-current-battle__time-description">Starting in:</span>
              <Countdown time={countdown}/>
            </div>
            <div className="ca-current-battle__start-button">

              <CaButton
                value="Start the battle"
                disabled={!this.isGameFull()}
              />

            </div>
          </div>

          <div className="ca-current-battle__info">
            <div className="ca-current-battle__info-icon">
              <img src={userImage} alt="Can not found User img"/>
            </div>
            <span className="ca-current-battle__info-text">Players: </span>
            <span
              className="ca-current-battle__info-count">{waitBattlePlayersCountAction}/{this.props.games && this.props.games.length ?
              this.props.games[this.getGameIndex()].maxPlayersInRoom : 0}</span>
          </div>

          <div className="ca-current-battle__info">
            <div className="ca-current-battle__info-icon">
              <img src={clockImage} alt="Can not found User img"/>
            </div>
            <span className="ca-current-battle__info-text">Battle time: </span>
            <span className="ca-current-battle__info-count">5 minutes</span>
          </div>

          <div className="ca-current-battle__invite-button">
            <CaButton
              value="Invite friend"
              disabled={true}
            />
          </div>

          <div className="ca-current-battle__leave-button">
            <CaButton
              clickHandler={() => {
                leaveBattleAction(battleName);
                this.props.history.push('/battles')
              }}
              value="Leave the room"
            />
          </div>

        </div>
      </section>
    );
  }
}
