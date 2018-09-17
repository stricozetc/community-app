import * as React from 'react';

import { CaButton, GameCardProps } from 'components';

import clockImage from 'assets/clock.svg';
import userImage from 'assets/user.svg';
import { I18n } from 'react-i18next';

import { MoreMenu } from '../MoreMenu';

import './GameCard.scss';
import './GameCardFooter.scss';
import './IconWithInfo.scss';

export class CaGameCard extends React.Component<GameCardProps> {
  public joinGame = () => {
    this.props.joinGame(this.props.game.appName);
  }
  public leaveGame = () => {
    this.props.leaveGame(this.props.game.appName);
  }

  public getBattleButton = (isWaitBattle: boolean): JSX.Element => {
    if (!isWaitBattle) {
      return (
        <I18n>{(t) => (
          <CaButton
            onClick={this.joinGame}
          >
            {t('joinTheBattle')}
          </CaButton>
        )}
        </I18n>
      );
    } else {
      return (
        <I18n>{(t) => (
          <CaButton
            onClick={this.leaveGame}
          >
            {t('returnToRoom')}
          </CaButton>
        )}
        </I18n>
      );
    }
  }

  public render(): JSX.Element {
    const { waitBattlePlayersCountAction, isFull, battleStartTime, isWaitBattle } = this.props;

    const { appName, description, maxRoomPlayer } = this.props.game;

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
      <I18n>{(t) => (
        <div className={['ca-game-card', ...classes].join(' ')}>
          <div className='ca-game-card__container'>
            <div className='ca-game-card__content'>
              <div className='ca-game-card__text'>
                <div className='ca-game-card__title'>
                  <div className='ca-game-card__game-name'>
                    {appName}
                  </div>
                  <MoreMenu items={this.props.moreMenuItems} />
                </div>
                <div className='ca-game-card__description'>
                  {description}
                </div>
                <div className='ca-game-card__btn-container'>
                  {!isFull ? this.getBattleButton(isWaitBattle) : <span />}
                </div>
              </div>
            </div>
            <div className={'ca-game-footer ' + backgroundFooterColor}>

              {maxRoomPlayer === 1
                ? (<div className='ca-game-footer__container-single-player'>{t('singlePlayer')}</div>)
                : (
                  <div
                    className={isFull
                      ? 'ca-game-footer__container'
                      : 'ca-game-footer__container ' + backgroundFooterColor}>
                    <div className='ca-game-footer__container-item'>
                      <div className='ca-game-footer__placeholder'>
                        <div className='ca-game-footer__icon'>
                          <img src={clockImage} alt='Can not found clock img' />
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
                    </div>
                    <div className='ca-game-footer__container-item'>
                      <div className='ca-game-footer__placeholder'>
                        <div className='ca-game-footer__icon'>
                          <img src={userImage} alt='Can not found User img' />
                        </div>
                        <div className='ca-game-footer__info'>
                          <div className='ca-game-footer__first-line'>{t('players') + ':'}</div>
                          <div
                            className={'ca-game-footer__second-line ' + secondLineColor}
                          >
                            {`${waitBattlePlayersCountAction} / ${(maxRoomPlayer)}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      )}
      </I18n>
    );
  }
}
