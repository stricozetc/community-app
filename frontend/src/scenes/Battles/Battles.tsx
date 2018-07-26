import './Battles.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import {
  AuthStatus,
  LoadStatus,
  Game,
  RoomInfo,
  SnackbarType,
  transitionDirection } from 'models';
import { AppState, LogoutUser } from 'store';

import { BattleProps } from './Battles.model';

import { CaGameCard, CaSnackbar, CaSpinner } from 'components';

import { InitGames, JoinBattle, LeaveBattle } from 'store';

import { isEmpty } from 'utils/isEmpty';

import { OpenSnackbar, CloseSnackbar } from 'store/snackbar';

class CaBattlesComponent extends React.Component<BattleProps> {

  public componentWillReceiveProps(nextProps: BattleProps): void {
    if (nextProps.status === LoadStatus.FAILED && nextProps.status !== this.props.status) {
      this.props.openSnackbar();
    }
  }

  public componentWillMount(): void {

    const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }

    if (isEmpty(this.props.games)) {
      this.props.initGames();
    }

  }

  public closeSnackbar(): void {
    this.props.closeSnackbar();
  }

  public getGameRooms(game: Game): RoomInfo[] {
    return this.props.roomsInfo.filter(r => r.gameId === game.id);
  }

  public getNearestCountdown(rooms: RoomInfo[]): number {
    const mappedRooms = rooms
      .map(r => r.distance)
      .filter(d => !!d);

    const sortedRooms = mappedRooms && mappedRooms.length ? mappedRooms
      .sort((a: any, b: any) => {
        return a - b;
      }) as number[] : [];

    return sortedRooms && sortedRooms[0] ? sortedRooms[0] : 0;
  }

  public render(): JSX.Element {
    return (
      <div className='ca-homepage'>
        {this.props.children}

        <CaSnackbar
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={this.props.isSnackbarOpen}
          autoHideDuration={4000}
          handleClose={() => this.closeSnackbar()}
          type={SnackbarType.error}
          message={<span> Game fetching Failed! </span>}
          transitionDirection={transitionDirection.down}
        />

        {!isEmpty(this.props.games) && (
          <div className='ca-homepage__container ca-global-fadeIn'>

            {this.props.games.map((game: Game, index: number) => {
              const gameRooms = this.getGameRooms(game);
              const waitBattlePlayersCount = gameRooms && gameRooms.length ? gameRooms
                .map(r => r.playersCount)
                .reduce((accumulator, currentValue: number) => accumulator + currentValue) : 0;

              return (
                <div className='ca-homepage__container-for-games' key={index}>
                  <CaGameCard
                    game={game}
                    joinGame={($event) => {
                      this.props.joinBattleAction($event);
                      this.props.history.push(`/battles/${index}`);
                    }}
                    leaveGame={this.props.leaveBattleAction}
                    status={this.props.battleStatus}
                    battleStatus={this.props.battleStatus}
                    waitBattlePlayersCountAction={waitBattlePlayersCount}
                    isFull={waitBattlePlayersCount === game.maxRoomPlayer * game.maxRooms}
                    battleStartTime={new Date((new Date()).getTime() + this.getNearestCountdown(gameRooms))}
                  />

                </div>
              );
            })}
          </div>
        )}
        {this.props.status === 1 && (
          <div className='ca-homepage__spinner-container'>
            <CaSpinner isActive={this.props.status === 1}/>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  battleStatus: state.battle.status,
  roomsInfo: state.battle.roomsInfo,
  games: state.games.games,
  status: state.games.gamesStatus,
  isSnackbarOpen: state.snackbarUi.isOpen
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
  leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
  initGames: () => dispatch(new InitGames()),
  closeSnackbar: () => dispatch(new CloseSnackbar()),
  openSnackbar: () => dispatch(new OpenSnackbar())
});

export const CaBattles = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaBattlesComponent);
