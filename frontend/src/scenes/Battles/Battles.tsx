import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AuthStatus,
  GameModel,
  MoreMenuItem,
  RoomInfo
} from 'models';

import { CaGameCard, CaSpinner } from 'components';
import { isEmpty } from 'utils';

import {
  AppState,
  JoinBattle,
  LoadGames,
  LogoutUser
} from 'store';

import { BattleProps } from './Battles.model';

import './Battles.scss';

class CaBattlesComponent extends React.Component<BattleProps> {

  public componentWillMount(): void {
    const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }

    this.props.initGames();
  }

  public getGameRooms = (game: GameModel): RoomInfo[] => {
    return this.props.roomsInfo.filter(r => r.gameId === game.id);
  }

  public getNearestCountdown = (rooms: RoomInfo[]): number => {
    const mappedRooms = rooms
      .map(r => r.distance)
      .filter(d => !!d);

    const sortedRooms = mappedRooms && mappedRooms.length ? mappedRooms
      .sort((a: number | undefined, b: number | undefined) => {
        return a && b ? a - b : 1 - 2;
      }) as number[] : [];

    return sortedRooms && sortedRooms[0] ? sortedRooms[0] : 0;
  }

  public redToWaitRoom = (): void => {
    this.props.history.push('/wait-battle');
  }

  public render(): JSX.Element {
    return (
      <div className='ca-homepage'>
        {this.props.children}

        {!isEmpty(this.props.games) && (
          <div className='ca-homepage__container ca-global-fadeIn'>
            {this.props.games.map((game: GameModel, index: number) => {
              const moreMenuItems: MoreMenuItem[] = [
                {
                  title: 'leaders',
                  action: () => this.props.history.push(`/leaders/${game.appName}`)
                }
              ];

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
                      this.props.history.push(`/wait-battle`);
                    }}
                    moreMenuItems={moreMenuItems}
                    leaveGame={this.redToWaitRoom}
                    status={this.props.battleStatus}
                    battleStatus={this.props.battleStatus}
                    waitBattlePlayersCountAction={waitBattlePlayersCount}
                    // (Mikalai) add logic if we don't have empty place for new player
                    isFull={!!this.props.gameId && this.props.gameId !== game.id}
                    isWaitBattle={this.props.gameId === game.id ? true : false}
                    battleStartTime={new Date((new Date()).getTime() + this.getNearestCountdown(gameRooms))}
                  />
                </div>
              );
            })}
          </div>
        )}
        {this.props.status === 1 && (
          <div className='ca-homepage__spinner-container'>
            <CaSpinner isActive={this.props.status === 1} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  battleStatus: state.battle.status,
  gameId: state.battle.gameId,
  roomsInfo: state.room.roomsInfo,
  games: state.games.games,
  status: state.games.gamesStatus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
  initGames: () => dispatch(new LoadGames())
});

export const CaBattles = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaBattlesComponent);
