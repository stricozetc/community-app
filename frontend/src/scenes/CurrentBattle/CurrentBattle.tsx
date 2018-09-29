import * as React from 'react';
import { I18n } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import clockImage from 'assets/clock-small.svg';
import swordImage from 'assets/sword.svg';
import userImage from 'assets/user-small.svg';
import { CaButton, Countdown } from 'components';

import {
  AppState,
  LeaveRoom,
  LogoutUser
} from 'store';

import {
  AuthStatus,
  BattleStatus,
} from 'models';

import { CurrentBattleProps } from './CurrentBattle.model';

import './CurrentBattle.scss';

export class CurrentBattleComponent extends React.Component<CurrentBattleProps> {
  public componentWillMount(): void {
    if (this.props.authStatus === AuthStatus.NotAuthorized) {
      this.props.history.push('/battles');
    }

    if (this.props.gameStatus === BattleStatus.Init) {
      this.props.history.push('/login');
    }
  }

  public isGameFull(): boolean {
    return this.props.currentPlayerRoom ?
      this.props.currentPlayerRoom.playersCount === this.props.currentPlayerRoom.maxPlayersCount :
      false;
  }

  public getGameName = (): string => {
    return this.props.currentPlayerRoom ? this.props.currentPlayerRoom.gameName : '';
  }

  // public getGameCountdown = (): number => {
  //   return this.props.currentPlayerRoom && this.props.currentPlayerRoom.distance ? this.props.currentPlayerRoom.distance : 0;
  // }

  public handleLeaveRoom = () => {
    this.props.leaveBattleAction(this.getGameName());
    this.props.history.push('/battles');
  }

  public render(): JSX.Element {
    const { currentPlayerRoom } = this.props;

    return (
      < I18n >
        {
          (t) => (
            <section className='ca-current-battle'>
              {this.props.children}
              <div className='ca-current-battle__content'>
                <div className='ca-current-battle__header'>
                  <div className='ca-current-battle__logo'>
                    <img src={swordImage} alt='Can not found User img' />
                  </div>
                  <div className='ca-current-battle__header-text'>
                    <div className='ca-current-battle__title'>
                      {this.getGameName()}
                    </div>
                    <div className='ca-current-battle__sub-title'>
                      {currentPlayerRoom ? currentPlayerRoom.description : ''}
                    </div>
                  </div>
                </div>

                {this.props.battleStatus === BattleStatus.Wait ? <div className='ca-current-battle__time-line'>
                  <div className='ca-current-battle__time'>
                    <span className='ca-current-battle__time-description'>{t('startingIn') + ':'}</span>
                    <Countdown time={currentPlayerRoom && currentPlayerRoom.distance ? currentPlayerRoom.distance : 0} />
                  </div>
                  <div className='ca-current-battle__start-button'>

                    <CaButton
                      disabled={!this.isGameFull()}
                    >
                      {t('startTheBattle')}
                    </CaButton>

                  </div>
                </div> : <h1 className='ca-current-battle__waiting-for-redirect'>{t('waitingForRedirect')}</h1>}

                {this.props.battleStatus === BattleStatus.Wait ? <div className='ca-current-battle__info'>
                  <div className='ca-current-battle__info-icon'>
                    <img src={userImage} alt='Can not found User img' />
                  </div>
                  <span className='ca-current-battle__info-text'>{t('players') + ':'}</span>
                  <span
                    className='ca-current-battle__info-count'>
                    {currentPlayerRoom ? currentPlayerRoom.playersCount : 0}/{currentPlayerRoom ? currentPlayerRoom.maxPlayersCount : 0}
                  </span>
                </div> : null}

                {this.props.battleStatus === BattleStatus.Wait ? <div className='ca-current-battle__info'>
                  <div className='ca-current-battle__info-icon'>
                    <img src={clockImage} alt='Can not found User img' />
                  </div>
                  <span className='ca-current-battle__info-text'>{t('battleTime') + ':'} </span>
                  <span
                    className='ca-current-battle__info-count'>
                    {t('minutes', { count: currentPlayerRoom ? currentPlayerRoom.maxWaitingTime : 0 })}
                  </span>
                </div> : null}

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

const mapStateToProps = (state: AppState) => ({
  battleStatus: state.room.battleStatus,
  rooms: state.room.rooms,
  currentPlayerRoom: state.room.currentPlayerRoom,
  gameStatus: state.room.battleStatus,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveBattleAction: (name: string) => dispatch(new LeaveRoom(name)),
  logoutUser: () => dispatch(new LogoutUser())
});

export const CurrentBattle = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentBattleComponent);
