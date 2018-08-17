import * as React from 'react';
import { connect } from 'react-redux';

import {
  AuthStatus,  
  RoomInfo,    
  GameModel
} from 'models';

import { CaGameCard, CaSpinner } from 'components';
import { AppState, LogoutUser } from 'store';
import { JoinBattle, LeaveBattle, LoadGames } from 'store';
import { isEmpty } from 'utils/isEmpty';

import { BattleProps } from './Battles.model';
import './Battles.scss';

class CaBattlesComponent extends React.Component<BattleProps> {
    
  public componentWillMount(): void {
    const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }

    this.props.initGames();
  }
  
  public getGameRooms(game: GameModel): RoomInfo[] {
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
        
        {!isEmpty(this.props.games) && (
          <div className='ca-homepage__container ca-global-fadeIn'>
            {this.props.games.map((game: GameModel, index: number) => {
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
  roomsInfo: state.battle.roomsInfo,
  games: state.games.games,
  status: state.games.gamesStatus  
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(new LogoutUser()),
  joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
  leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
  initGames: () => dispatch(new LoadGames()),
});

export const CaBattles = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaBattlesComponent);