import { connect } from 'react-redux';
import { AppState, LeaveBattle, LogoutUser } from 'store';

import { CurrentBattleComponent } from './CurrentBattle';

const mapStateToProps = (state: AppState) => ({
  roomsInfo: state.battle.roomsInfo,
  battleName: state.battle.battleName,
  countdown: state.battle.countdown,
  games: state.games.games,
  gameStatus: state.battle.status,
  authStatus: state.auth.status
});

const mapDispatchToProps = (dispatch: any) => ({
  leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name)),
  logoutUser: () => dispatch(new LogoutUser())
});

export const CurrentBattle = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentBattleComponent);
