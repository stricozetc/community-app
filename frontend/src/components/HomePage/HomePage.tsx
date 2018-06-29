import './HomePage.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus, BattleStatus } from 'models';
import { AppState, LogoutUser } from 'store';

import { HomePageProps } from './HomePage.model';

import { CaNavbar } from './../Navbar';

import { CaLogo } from './../Logo/Logo';

import Button from '@material-ui/core/Button';
import { CaGameCard } from './../GameCard/GameCard';

import { CaFooter } from './../Footer/Footer';

import userImage from './../../assets/user.svg';

import clockImage from './../../assets/clock.svg';
import { CaIconWithInfo } from './../IconWithInfo';

import { InitGames, JoinBattle, LeaveBattle } from 'store';
import { Game } from './../GameCard/GameCard.model';
import { CaSpinner } from './../Spinner/Spinner';

import { isEmpty } from './../../utils/isEmpty';

// const games: Game[] = [
//   {
//     name: 'JS Marathon',
//     desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
//     timeToStart: '16:34:48',
//     isStarted: false,
//     maxPlayersInRoom: 5
//   },
//   {
//     name: 'CSS Quick Draw',
//     desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
//     timeToStart: '12:16:32',
//     isStarted: true,
//     maxPlayersInRoom: 20
//   }
// ]

class CaHomePageComponent extends React.Component<HomePageProps> {
    public componentWillMount(): void {
        if (isEmpty(this.props.games)) {
            this.props.initGames();
        }
    }

    public componentDidMount(): void {
        if (this.props.status === AuthStatus.NOT_AUTHORIZED) {
            this.props.history.push('/login');
        }
    }

    public logoutUser(): void {
        this.props.logoutUser();
        this.props.history.push('/');
    }

    public getWaitPlayersCount(
        status: BattleStatus,
        waitBattlePlayersCountAction: number,
        maxInRoom: number
    ): string {
        return `${waitBattlePlayersCountAction} / ${maxInRoom}`;
    }

    public render(): JSX.Element {
        const { games } = this.props;

        return (
            <div className="ca-homepage">
                <div className="ca-homepage__container-for-nav">
                    <CaNavbar
                        modificators={['ca-navbar--margin-left']}
                        linksToRender={[
                            {
                                text: 'Battles',
                                to: '/battles',
                                activeClassName: 'ca-navbar__nav-item--active'
                            },
                            {
                                text: 'Statistics',
                                to: '/statistics',
                                activeClassName: 'ca-navbar__nav-item--active'
                            }
                        ]}
                    >
                        <CaLogo
                            text="battlenet"
                            modificators={[
                                'ca-logo--orange',
                                'ca-logo--uppercase',
                                'ca-logo--big-font',
                                'ca-logo--bold-font'
                            ]}
                        />
                        <div className="ca-navbar__logout-btn-container">
                            <Button
                                variant="contained"
                                onClick={() => this.logoutUser()}
                            >
                                Logout
                            </Button>
                        </div>
                    </CaNavbar>
                </div>

                {!this.props.fetchingData && (
                    <div className="ca-homepage__container ca-global-fadeIn">
                        {/* <BattleRegistration /> */}

                        {games.map((game: Game, index: number) => {
                            const backgroundFooterColor = game.isStarted
                                ? 'ca-footer--locked-game-background'
                                : 'ca-footer-unlocked-game-background';
                            const secondLineColor = game.isStarted
                                ? 'ca-icon-with-info__second-line--full-players'
                                : '';

                            return (
                                <div
                                    className="ca-homepage__container-for-games"
                                    key={index}
                                >
                                    <CaGameCard
                                        game={game}
                                        joinGame={this.props.joinBattleAction}
                                        leaveGame={this.props.leaveBattleAction}
                                        status={this.props.battleStatus}
                                        gameCardFooter={
                                            <CaFooter
                                                modificators={[
                                                    'ca-footer--row-align',
                                                    'ca-footer--normal-min-height',
                                                    'ca-footer--position-absolute',
                                                    backgroundFooterColor
                                                ]}
                                            >
                                                <div className="ca-footer__container">
                                                    <div className="ca-footer__container-item">
                                                        {game.isStarted ? (
                                                            <span className="ca-footer__alert">
                                                                {' '}
                                                                full room{' '}
                                                            </span>
                                                        ) : (
                                                            <CaIconWithInfo
                                                                img={clockImage}
                                                                imgNotFound="Can not found clock img"
                                                                firstLine="Starting in:"
                                                                secondLine="16:34:48"
                                                                secondLineModificators={[
                                                                    'ca-icon-with-info__second-line--spec-size'
                                                                ]}
                                                                firstLineModificators={[
                                                                    'ca-icon-with-info__first-line--spec-size'
                                                                ]}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="ca-footer__container-item">
                                                        <CaIconWithInfo
                                                            img={userImage}
                                                            imgNotFound="Can not found clock img"
                                                            firstLine="Players:"
                                                            secondLine={this.getWaitPlayersCount(
                                                                this.props
                                                                    .battleStatus,
                                                                this.props
                                                                    .waitBattlePlayersCountAction,
                                                                game.maxPlayersInRoom
                                                            )}
                                                            secondLineModificators={[
                                                                'ca-icon-with-info__second-line--spec-size',
                                                                secondLineColor
                                                            ]}
                                                            firstLineModificators={[
                                                                'ca-icon-with-info__first-line--spec-size'
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </CaFooter>
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
                {this.props.fetchingData && (
                    <div className="ca-homepage__spinner-container">
                        <CaSpinner isActive={this.props.fetchingData} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    status: state.auth.status,
    battleStatus: state.battle.status,
    waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount,
    fetchingData: state.data.fetchingData,
    games: state.games.games
});

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(new LogoutUser()),
    joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
    leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
    initGames: () => dispatch(new InitGames())
});

export const CaHomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaHomePageComponent);
