import * as React from 'react';

import {CaButton, GameCardProps} from 'components';
import {BattleStatus} from 'models';

import clockImage from 'assets/clock.svg';
import userImage from 'assets/user.svg';
import { I18n } from 'react-i18next';

import './GameCard.scss';
import './GameCardFooter.scss';
import './IconWithInfo.scss';

const getBattleButton = (
  status: BattleStatus,
  joinBattleAction: any,
  leaveBattleAction: any,
  gameName: string
): JSX.Element => {
  if (status === BattleStatus.INIT) {
    return (
      <I18n>
        {
          ( t ) => (
            <CaButton
              onClick={() => joinBattleAction(gameName)}
            >
            {t('joinTheBattle')}
            </CaButton>
          )
        }
      </I18n>
    );
  } else {
    return (
      <I18n>
        {
          ( t ) => (
            <CaButton
              onClick={() => leaveBattleAction(gameName)}
            >
            {t('leaveTheBattle')}
            </CaButton>
          )
        }
      </I18n>
    );
  }
};

export const CaGameCard = (props: GameCardProps) => {
  const {status, joinGame, leaveGame, waitBattlePlayersCountAction, isFull, battleStartTime} = props;

  const {appName, description, maxRoomPlayer, maxRooms} = props.game;

  const secondLineColor = isFull
    ? 'ca-game-footer__second-line--full-players'
    : '';

  const backgroundFooterColor = isFull
    ? 'ca-game-footer--locked-game-background'
    : 'ca-game-footer--unlocked-game-background';

  const topBorderClass: string = isFull
    ? 'ca-game-card--grey-top'
    : 'ca-game-card--white-top';
  const backgroundClass: string = isFull
    ? 'ca-game-card--black-background'
    : 'ca-game-card--grey-background';
  const classes = [topBorderClass, backgroundClass];

  return (
    <I18n>
      {
        ( t ) => (
          <div className={['ca-game-card', ...classes].join(' ')}>
            <div className='ca-game-card__container'>
              <h1 className='ca-game-card__game-title'>{appName}</h1>
              <h2 className='ca-game-card__game-desc'>{description}</h2>

              <div className='ca-game-card__btn-container'>
                {!isFull ? getBattleButton(status, joinGame, leaveGame, appName) : <span/>}
              </div>
              <div className={'ca-game-footer ' + backgroundFooterColor}>
                <div className='ca-game-footer__container'>
                  <div className='ca-game-footer__container-item'>
                    {isFull ? (
                      <span className='ca-game-footer__alert'>{t('roomsAreFull')}</span>
                    ) : (
                      <div className='ca-game-footer__placeholder'>
                        <div className='ca-game-footer__icon'>
                          <img src={clockImage} alt='Can not found clock img'/>
                        </div>
                        <div className='ca-game-footer__info'>
                          <div className='ca-game-footer__first-line'>
                            {t('startingIn') + ':'}
                          </div>
                          <div
                            className={
                              'ca-game-footer__second-line ' + secondLineColor
                            }
                          >
                            {`${battleStartTime.getHours()}:${battleStartTime.getMinutes()}:${battleStartTime.getSeconds()}`}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='ca-game-footer__container-item'>
                    <div className='ca-game-footer__placeholder'>
                      <div className='ca-game-footer__icon'>
                        <img src={userImage} alt='Can not found User img'/>
                      </div>
                      <div className='ca-game-footer__info'>
                        <div className='ca-game-footer__first-line'>{t('players') + ':'}</div>
                        <div
                          className={'ca-game-footer__second-line ' + secondLineColor}
                        >
                          {`${waitBattlePlayersCountAction} / ${(maxRoomPlayer * maxRooms)}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </I18n>
  );
};
