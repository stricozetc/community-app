import './Battles.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { AuthStatus, LoadStatus, Game } from 'models';
import { AppState, LogoutUser } from 'store';

import { BattleProps } from './Battles.model';

import { CaGameCard } from 'components/GameCard';
import { CaSpinner } from 'components/Spinner';

import { InitGames, JoinBattle, LeaveBattle } from 'store';

import { isEmpty } from 'utils/isEmpty';


import { CaSnackbar } from 'components/Snackbar';

import { OpenSnackbar, CloseSnackbar } from 'store/snackbar';


class CaBattlesComponent extends React.Component<BattleProps> {

  public componentWillReceiveProps(nextProps: BattleProps): void {
    if(nextProps.status === LoadStatus.FAILED && nextProps.status !== this.props.status ) {
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

  public closeSnackbar(): void{
    this.props.closeSnackbar();
  }


 
  public render(): JSX.Element {
    return (
      <div className="ca-homepage">
        {this.props.children}

        <CaSnackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={ this.props.isSnackbarOpen }
          autoHideDuration = {4000}
          handleClose= {() => this.closeSnackbar()}
          type="error"
          message={<span> Game fetching Failed! </span>}
          transitionDirection="down"
        />

        {!isEmpty(this.props.games) && (
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
        {this.props.status === 1 && (
          <div className="ca-homepage__spinner-container">
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
  waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount,
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
