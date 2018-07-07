import './Battles.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus, Game } from 'models';
import { AppState, LogoutUser } from 'store';

import { BattleProps } from './Battles.model';

import { CaGameCard } from 'components/GameCard';
import { CaSpinner } from 'components/Spinner';

import { InitGames, JoinBattle, LeaveBattle } from 'store';

import { isEmpty } from 'utils/isEmpty';

class CaBattlesComponent extends React.Component<BattleProps> {
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

  public render(): JSX.Element {
    return (
      <div className="ca-homepage">
        {this.props.children}

        {!this.props.fetchingData && (
          <div className="ca-homepage__container ca-global-fadeIn">

            {this.props.games.map((game: Game, index: number) => {

              return (
                <div className="ca-homepage__container-for-games" key={index}>
                  <CaGameCard
                    game={game}
                    joinGame={($event) => {
                      this.props.joinBattleAction($event);
                      this.props.history.push(`/battles/${index}`)
                    }}
                    leaveGame={this.props.leaveBattleAction}
                    status={this.props.battleStatus}
                    battleStatus={this.props.battleStatus}
                    waitBattlePlayersCountAction={this.props.waitBattlePlayersCountAction}
                  />
                </div>
              );
            })}
          </div>
        )}
        {this.props.fetchingData && (
          <div className="ca-homepage__spinner-container">
            <CaSpinner isActive={this.props.fetchingData}/>
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

export const CaBattles = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaBattlesComponent);
