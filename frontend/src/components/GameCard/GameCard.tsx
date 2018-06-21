import * as React from 'react';

import './GameCard.scss';
import './GameCardFooter.scss';
import './IconWithInfo.scss';

import { BattleStatus } from 'models';

import { gameNamesDictionary } from './GameNames';

import { GameCardProps, GameNamePair } from './GameCard.model';

import { CaButton } from 'components/form-controls/Button';

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
        clickHandler={() => joinBattleAction(gameName)}
        value="Join The Battle"
      />
    );
  } else {
    return (
      <CaButton
        clickHandler={() => leaveBattleAction(gameName)}
        value="Leave The Battle"
      />
    );
  }
};

export const CaGameCard = (props: GameCardProps) => {
  const { status, joinGame, leaveGame, waitBattlePlayersCountAction } = props;

  const { name, desc, isStarted, maxPlayersInRoom } = props.game;

  const gameNamesPair = gameNamesDictionary.filter(
    (p: GameNamePair) => p.frontName === name
  )[0] || { backName: '' };
  const backName = gameNamesPair.backName;

  const secondLineColor = props.game.isStarted
    ? 'ca-game-footer__second-line--full-players'
    : '';

  const backgroundFooterColor = props.game.isStarted
    ? 'ca-game-footer--locked-game-background'
    : 'ca-game-footer--unlocked-game-background';

  const topBorderClass: string = props.game.isStarted
    ? 'ca-game-card--grey-top'
    : 'ca-game-card--white-top';
  const backgroundClass: string = props.game.isStarted
    ? 'ca-game-card--black-background'
    : 'ca-game-card--grey-background';
  const classes = [topBorderClass, backgroundClass];

  return (
    <div className={['ca-game-card', ...classes].join(' ')}>
      <div className="ca-game-card__container">
        <h1 className="ca-game-card__game-title">{name}</h1>
        <h2 className="ca-game-card__game-desc">{desc}</h2>

        <div className="ca-game-card__btn-container">
          {!isStarted ? getBattleButton(status, joinGame, leaveGame, backName) : <span/>}
        </div>
        <div className={'ca-game-footer ' + backgroundFooterColor}>
          <div className="ca-game-footer__container">
            <div className="ca-game-footer__container-item">
              {isStarted ? (
                <span className="ca-game-footer__alert"> full room </span>
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
                      16:34:48
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
                    {`${waitBattlePlayersCountAction} / ${maxPlayersInRoom}`}
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
