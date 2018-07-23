import * as React from 'react';

import './GameCard.scss';
import './GameCardFooter.scss';
import './IconWithInfo.scss';

import {BattleStatus} from 'models';

import {CaButton, GameCardProps} from 'components';

import userImage from 'assets/user.svg';

import clockImage from 'assets/clock.svg';

const getBattleButton = (
  status: BattleStatus,
  joinBattleAction: any,
  leaveBattleAction: any,
  gameName: string
): JSX.Element => {
  if (status === BattleStatus.INIT) {
    return (
      <CaButton
        onClick={() => joinBattleAction(gameName)}
      >
      Join The Battle
      </CaButton>
    );
  } else {
    return (
      <CaButton
        onClick={() => leaveBattleAction(gameName)}
      >
      Leave The Battle
      </CaButton>
    );
  }
};

export const CaGameCard = (props: GameCardProps) => {
  const {status, joinGame, leaveGame, waitBattlePlayersCountAction, isFull, battleStartTime} = props;

  const {name, desc, maxRoomPlayer, maxRooms} = props.game;

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
    <div className={['ca-game-card', ...classes].join(' ')}>
      <div className="ca-game-card__container">
        <h1 className="ca-game-card__game-title">{name}</h1>
        <h2 className="ca-game-card__game-desc">{desc}</h2>

        <div className="ca-game-card__btn-container">
          {!isFull ? getBattleButton(status, joinGame, leaveGame, name) : <span/>}
        </div>
        <div className={'ca-game-footer ' + backgroundFooterColor}>
          <div className="ca-game-footer__container">
            <div className="ca-game-footer__container-item">
              {isFull ? (
                <span className="ca-game-footer__alert"> All rooms are full  </span>
              ) : (
                <div className="ca-game-footer__placeholder">
                  <div className="ca-game-footer__icon">
                    <img src={clockImage} alt="Can not found clock img"/>
                  </div>
                  <div className="ca-game-footer__info">
                    <div className="ca-game-footer__first-line">
                      Starting in:
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
            <div className="ca-game-footer__container-item">
              <div className="ca-game-footer__placeholder">
                <div className="ca-game-footer__icon">
                  <img src={userImage} alt="Can not found User img"/>
                </div>
                <div className="ca-game-footer__info">
                  <div className="ca-game-footer__first-line">Players:</div>
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
  );
};
