import * as React from 'react';

import { CaButton, Countdown } from 'components';

import './current-battle.scss';

import swordImage from 'assets/sword.svg';
import userImage from 'assets/user-small.svg';
import clockImage from 'assets/clock-small.svg';
import { AuthStatus, BattleStatus, Game, RoomInfo } from 'models';

interface Props {
  roomsInfo: RoomInfo[];
  battleName: string;
  countdown: number;
  history: any;
  games: Game[];
  gameStatus: number;
  authStatus: number;

  leaveBattleAction(payload: string): void;

  logoutUser(): void;
}

export class CurrentBattleComponent extends React.Component<Props> {
  public componentWillMount(): void {
    if (this.props.authStatus === AuthStatus.NOT_AUTHORIZED) {
      this.props.history.push('/battles');
    }

    if (this.props.gameStatus === BattleStatus.INIT) {
      this.props.history.push('/login');
    }
  }

  public getGameIndex(): number {
    const currentRoute = this.props.history.location.pathname;
    const test = new RegExp(/\d+/);
    const foundNumber = test.exec(currentRoute) || ['0'];

    return parseInt(foundNumber[0], 0);
  }

  public isGameFull(): boolean {
    const maxRoomPlayers = this.props.games && this.props.games.length ?
      this.props.games[this.getGameIndex()].maxRoomPlayer : 0;
    const roomPlayers = this.getPlayersCount();

    return roomPlayers === maxRoomPlayers;
  }

  public getPlayersCount(): number {
    /**
     * @todo need to refactor logic with room id and game indexes
     * @type {RoomInfo | undefined}
     */
    const currentRoom = this.props.roomsInfo.find(r => r.id === this.getGameIndex());
    return currentRoom ? currentRoom.playersCount : 0;
  }

  public render(): JSX.Element {
    const {battleName, countdown, leaveBattleAction} = this.props;

    const currentGame = this.props.games && this.props.games.length ?
      this.props.games[this.getGameIndex()] : undefined;

    return (
      <section className='ca-current-battle'>
        {this.props.children}
        <div className='ca-current-battle__content'>
          <div className='ca-current-battle__header'>
            <div className='ca-current-battle__logo'>
              <img src={swordImage} alt='Can not found User img'/>
            </div>
            <div className='ca-current-battle__header-text'>
              <div className='ca-current-battle__title'>
                {battleName}
              </div>
              <div className='ca-current-battle__sub-title'>
                {currentGame ?
                  currentGame.desc : ''}
              </div>
            </div>
          </div>

          <div className='ca-current-battle__time-line'>
            <div className='ca-current-battle__time'>
              <span className='ca-current-battle__time-description'>Starting in:</span>
              <Countdown time={countdown}/>
            </div>
            <div className='ca-current-battle__start-button'>

              <CaButton
                disabled={!this.isGameFull()}
              >
              Start the battle
              </CaButton>

            </div>
          </div>

          <div className='ca-current-battle__info'>
            <div className='ca-current-battle__info-icon'>
              <img src={userImage} alt='Can not found User img'/>
            </div>
            <span className='ca-current-battle__info-text'>Players: </span>
            <span
              className='ca-current-battle__info-count'>{this.getPlayersCount()}/{currentGame ?
              currentGame.maxRoomPlayer : 0}</span>
          </div>

          <div className='ca-current-battle__info'>
            <div className='ca-current-battle__info-icon'>
              <img src={clockImage} alt='Can not found User img'/>
            </div>
            <span className='ca-current-battle__info-text'>Battle time: </span>
            <span
              className='ca-current-battle__info-count'>{currentGame ? currentGame.battleTime / 60000 : 0} minutes</span>
          </div>

          <div className='ca-current-battle__invite-button'>
            <CaButton
              disabled={true}
            >
            Invite friend
            </CaButton>
          </div>

          <div className='ca-current-battle__leave-button'>
            <CaButton
              onClick={() => {
                leaveBattleAction(battleName);
                this.props.history.push('/battles');
              }}
            >
            Leave the room
            </CaButton>
          </div>

        </div>
      </section>
    );
  }
}