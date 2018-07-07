import './BattleRegistration.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { BattleStatus } from 'models';
import { AppState, JoinBattle, LeaveBattle } from 'store';

import { BattleRegistrationProps } from './BattleRegistration.model';

import { Countdown } from 'components/Countdown';

class BattleRegistrationComponent extends React.Component<BattleRegistrationProps> {
  private goToBattleHelpMassage: string = 'Press on "Go to the battle" page';
  private waitBattleHelpMassage: string = 'Please, wait other users';
  private goToBattleButtonMassage: string = 'Go to the battle';
  private leaveFromBattleButtonMassage: string = 'Leave form the battle';

  constructor(props: BattleRegistrationProps) {
    super(props);
  }

  public getBattleButton(
    status: BattleStatus,
    joinBattleAction: any,
    leaveBattleAction: any
  ): JSX.Element {
    if (status === BattleStatus.INIT) {
      return (
        <button onClick={() => joinBattleAction('JsMarathon')}>
          {this.goToBattleButtonMassage}
        </button>
      );
    } else {
      return (
        <button onClick={() => leaveBattleAction('JsMarathon')}>
          {this.leaveFromBattleButtonMassage}
        </button>
      );
    }
  }

  public getHelpMessage(status: BattleStatus): JSX.Element {
    if (status === BattleStatus.INIT) {
      return <span>{this.goToBattleHelpMassage}</span>;
    } else {
      return <span>{this.waitBattleHelpMassage}</span>;
    }
  }

  public getWaitPlayersCount(
    status: BattleStatus,
    waitBattlePlayersCountAction: number
  ): JSX.Element {
    if (status === BattleStatus.INIT) {
      return <span>&nbsp;</span>;
    } else {
      return (
        <span>{waitBattlePlayersCountAction}/5</span>
      )
    }
  }

  public getCountdown(status: BattleStatus, countdown: number): JSX.Element {
    if (status === BattleStatus.INIT) {
      return (
        <span>&nbsp;</span>
      )
    } else {
      return (
        <div className='ca-battle-registration__countdown'>
          <Countdown time={countdown}/>
        </div>
      )
    }
  }

  public render(): JSX.Element {
    const {
      status,
      joinBattleAction,
      leaveBattleAction,
      waitBattlePlayersCountAction,
      countdown
    } = this.props;

    return (
      <div className="ca-battle-registration">
        <div className="ca-battle-registration__registration-button">
          {this.getBattleButton(status, joinBattleAction, leaveBattleAction)}
        </div>
        <div className="ca-battle-registration__help-message">
          {this.getHelpMessage(status)}{' '}
          {this.getWaitPlayersCount(status, waitBattlePlayersCountAction)}
        </div>
        {this.getCountdown(status, countdown)}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  status: state.battle.status,
  waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount,
  countdown: state.battle.countdown
});

const mapDispatchToProps = (dispatch: any) => ({
  joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
  leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name))
});

export const BattleRegistration = connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleRegistrationComponent);
