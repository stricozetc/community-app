import './BattleRegistration.component.scss';

import * as  React from 'react';
import { connect } from 'react-redux'

import { BattleStatus } from "models";
import { AppState, JoinBattle, LeaveBattle } from "store";

import { BattleRegistrationProps } from "./BattleRegistration.model";

const goToBattleHelpMassage: string = 'Press on "Go to the battle" page';
const waitBattleHelpMassage: string = 'Please, wait other users';
const goToBattleButtonMassage: string = 'Go to the battle';
const leaveFromBattleButtonMassage: string = 'Leave form the battle';

const BattleRegistration = ({ status, waitBattlePlayersCountAction, joinBattleAction, leaveBattleAction }: BattleRegistrationProps) => (
    <div className="battle-registration">
        <div className='battle-registration__registration-button'>
            {getBattleButton(status, joinBattleAction, leaveBattleAction)}
        </div>
        <div className='battle-registration__help-message'>
            {getHelpMessage(status)} {getWaitPlayersCount(status, waitBattlePlayersCountAction)}
        </div>
    </div>
)

const getBattleButton = (status: BattleStatus, joinBattleAction: any, leaveBattleAction: any): JSX.Element => {
    if (status === BattleStatus.INIT) {
        return (
            <button onClick={() => joinBattleAction('JsMarathon')}>{goToBattleButtonMassage}</button>
        )
    } else {
        return (
            <button onClick={() => leaveBattleAction('JsMarathon')}>{leaveFromBattleButtonMassage}</button>
        )
    }
}

const getHelpMessage = (status: BattleStatus): JSX.Element => {
    if (status === BattleStatus.INIT) {
        return (
            <span>{goToBattleHelpMassage}</span>
        )
    } else {
        return (
            <span>{waitBattleHelpMassage}</span>
        )
    }
}

const getWaitPlayersCount = (status: BattleStatus, waitBattlePlayersCountAction: number): JSX.Element => {
    if (status === BattleStatus.INIT) {
        return (
            // tslint:disable-next-line:jsx-self-close
            <span></span>
        )
    } else {
        return (
            <span>({waitBattlePlayersCountAction}/5)</span>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    status: state.battle.status,
    waitBattlePlayersCountAction: state.battle.waitBattlePlayersCount
})

const mapDispatchToProps = (dispatch: any) => ({
    joinBattleAction: (name: string) => dispatch(new JoinBattle(name)),
    leaveBattleAction: (name: string) => dispatch(new LeaveBattle(name))
})

// tslint:disable-next-line:no-default-export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleRegistration)