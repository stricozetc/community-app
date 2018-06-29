import * as React from 'react';

import './GameCard.scss';

import Button from '@material-ui/core/Button';
import { BattleStatus } from 'models';

import { gameNamesDictionary } from './GameNames';

import { GameCardProps, GameNamePair } from './GameCard.model';

const getBattleButton = (
    status: BattleStatus,
    joinBattleAction: any,
    leaveBattleAction: any,
    gameName: string
): JSX.Element => {
    if (status === BattleStatus.INIT) {
        return (
            <Button
                variant="contained"
                className="ca-game-card__btn"
                onClick={() => joinBattleAction(gameName)}
            >
                Join The Battle
            </Button>
        );
    } else {
        return (
            <Button
                variant="contained"
                className="ca-game-card__btn"
                onClick={() => leaveBattleAction(gameName)}
            >
                Leave The Battle
            </Button>
        );
    }
};

export const CaGameCard = (props: GameCardProps) => {
    const { status, joinGame, leaveGame } = props;
    const { name, desc, isStarted } = props.game;

    const gameNamesPair = gameNamesDictionary.filter(
        (p: GameNamePair) => p.frontName === name
    )[0] || { backName: '' };
    const backName = gameNamesPair.backName;

    const topBorderClass: string = isStarted
        ? 'ca-game-card--grey-top'
        : 'ca-game-card--white-top';
    const backgroundClass: string = isStarted
        ? 'ca-game-card--black-background'
        : 'ca-game-card--grey-background';
    const classes = [topBorderClass, backgroundClass];

    return (
        <div
            className={
                props.modificators
                    ? ['ca-game-card', ...props.modificators, ...classes].join(
                          ' '
                      )
                    : ['ca-game-card', ...classes].join(' ')
            }
        >
            <div className="ca-game-card__container">
                <h1 className="ca-game-card__game-title">{name}</h1>
                <h2 className="ca-game-card__game-desc">{desc}</h2>

                <div className="ca-game-card__btn-container">
                    {getBattleButton(status, joinGame, leaveGame, backName)}
                </div>

                {props.gameCardFooter}
            </div>
        </div>
    );
};
