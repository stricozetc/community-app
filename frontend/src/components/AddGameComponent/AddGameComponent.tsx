import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GameForm } from 'components';
import { AddGame, AppState } from 'store';

import {
    AuthStatus,
    GameForSettingForm,
    GameModel,
    SettingFormType
} from 'models';

import { AddGameComponentProps } from './AddGameComponent.model';

const initFormForAddingNewGame: GameForSettingForm = {
    appName: '',
    description: '',
    maxRoomPlayer: 5,
    maxRooms: 1,
    requestUrl: '',
    maxWaitingTime: 20,
    redirectUrl: ''
};
export class AddGameComponent extends React.Component<AddGameComponentProps> {
    constructor(props: AddGameComponentProps) {
        super(props);
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;
        if (!isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    public onSubmit = (data: GameModel) => {
        this.props.addGame(data);
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.children}
                {this.props.user &&
                    < GameForm
                        userId={this.props.user && this.props.user.id}
                        config={SettingFormType.AddGame}
                        model={initFormForAddingNewGame}
                        submit={(data: GameModel) => this.props.addGame(data)}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addGame: (data: GameModel) => dispatch(new AddGame(data)),
});

export const CaAddGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGameComponent);
