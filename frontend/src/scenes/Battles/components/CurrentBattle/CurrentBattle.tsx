import * as React from 'react';

import clockImage from 'assets/clock-small.svg';
import swordImage from 'assets/sword.svg';
import userImage from 'assets/user-small.svg';
import { CaButton, Countdown } from 'components';
import { AuthStatus, BattleStatus, GameModel, RoomInfo } from 'models';
import { I18n } from 'react-i18next';

import './current-battle.scss';

interface Props {
  roomsInfo: RoomInfo[];
  battleName: string;
  countdown: number;
  history: any;
  games: GameModel[];
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

  public handleLeaveRoom = () => {
    this.props.leaveBattleAction(this.props.battleName);
    this.props.history.push('/battles');
  }

  public render(): JSX.Element {
    const { battleName, countdown } = this.props;

    const currentGame = this.props.games && this.props.games.length ?
      this.props.games[this.getGameIndex()] : undefined;

    const timeValue = currentGame ? currentGame.maxWaitingTime : 0;

    return (
      <I18n>
        {
          ( t ) => (
            <section className='ca-current-battle'>
              {this.props.children}
              <div className='ca-current-battle__content'>
                <div className='ca-current-battle__header'>
                  <div className='ca-current-battle__logo'>
                    <img src={swordImage} alt='Can not found User img' />
                  </div>
                  <div className='ca-current-battle__header-text'>
                    <div className='ca-current-battle__title'>
                      {battleName}
                    </div>
                    <div className='ca-current-battle__sub-title'>
                      {currentGame ?
                        currentGame.description : ''}
                    </div>
                  </div>
                </div>

                <div className='ca-current-battle__time-line'>
                  <div className='ca-current-battle__time'>
                    <span className='ca-current-battle__time-description'>{t('startingIn') + ':'}</span>
                    <Countdown time={countdown} />
                  </div>
                  <div className='ca-current-battle__start-button'>

                    <CaButton
                      disabled={!this.isGameFull()}
                    >
                      {t('startTheBattle')}
                    </CaButton>

                  </div>
                </div>

                <div className='ca-current-battle__info'>
                  <div className='ca-current-battle__info-icon'>
                    <img src={userImage} alt='Can not found User img' />
                  </div>
                  <span className='ca-current-battle__info-text'>{t('players') + ':'}</span>
                  <span
                    className='ca-current-battle__info-count'>{this.getPlayersCount()}/{currentGame ?
                      currentGame.maxRoomPlayer : 0}</span>
                </div>

                <div className='ca-current-battle__info'>
                  <div className='ca-current-battle__info-icon'>
                    <img src={clockImage} alt='Can not found User img' />
                  </div>
                  <span className='ca-current-battle__info-text'>{t('battleTime') + ':'} </span>
                  <span
                    className='ca-current-battle__info-count'>{t('minutes', { count: timeValue })}</span>
                </div>

                <div className='ca-current-battle__invite-button'>
                  <CaButton
                    disabled={true}
                  >
                    {t('inviteFriend')}
                  </CaButton>
                </div>

                <div className='ca-current-battle__leave-button'>
                  <CaButton
                    onClick={this.handleLeaveRoom}
                  >
                    {t('leaveTheRoom')}
                  </CaButton>
                </div>

              </div>
            </section>
          )
        }
      </I18n>
    );
  }
}
