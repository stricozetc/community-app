import { connect } from 'react-redux';
import { AppState, LeaveBattle, LogoutUser } from 'store';
import { CurrentBattleComponent } from './CurrentBattle';

const mapStateToProps = (state: AppState) => ({
  waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount,
  battleName: state.battle.battleName,
  countdown: state.battle.countdown,
  games: state.games.games
});

const mapDispatchToProps = (dispatch: any) => ({
  leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
  logoutUser: () => dispatch(new LogoutUser())
});

export const CurrentBattle = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentBattleComponent);
