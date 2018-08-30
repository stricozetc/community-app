import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GameForm } from 'components';
import { AppState, EditGame } from 'store';

import {
    AuthStatus,
    GameForSettingForm,
    GameModel,
    SettingFormType
} from 'models';

import { EditGameComponentProps } from './EditGameComponent.model';

export class EditGameComponent extends React.Component<EditGameComponentProps> {
    constructor(props: EditGameComponentProps) {
        super(props);
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;

        if (!isAuthenticated) {
            this.props.history.push('/login');
        }

        if (this.props.games.length === 0) {
            this.props.history.push('/_admin_console');
        }
    }

    public onSubmit = (data: GameModel) => {
        this.props.editGame(data);
    }

    public render(): JSX.Element {
        const game = this.getGame();
        const id = this.props.match.params['idOfTheGame'];

        return (
            <div>
                {this.props.children}
                {this.props.user &&
                    <GameForm
                        id={id}
                        userId={this.props.user && this.props.user.id}
                        config={SettingFormType.EditGame}
                        model={game}
                        submit={(data: GameModel) => this.props.editGame(data)}
                    />
                }
            </div>
        );
    }

    public getGame(): GameForSettingForm {

        const idOfTheGameThatNeedToEdit = this.props.match.params['idOfTheGame'];
        const myGames = this.props.games;

        const gameDataFromStore = Object.assign({}, myGames.find((game: GameModel) => game.id === +idOfTheGameThatNeedToEdit));
        return this.deleteUnnecessaryProperty(
            gameDataFromStore,
            ['appName', 'description', 'maxRoomPlayer', 'maxRooms', 'requestUrl', 'maxWaitingTime', 'redirectUrl']
        );
    }

    public deleteUnnecessaryProperty(game: GameModel, arrayOfNecessaryProperty: string[]): GameForSettingForm {
        const gameWithNecessaryProperty = { ...game };

        for (const property in gameWithNecessaryProperty) {
            if (!(arrayOfNecessaryProperty.indexOf(property) + 1)) {
                delete gameWithNecessaryProperty[property];
            }
        }
        return gameWithNecessaryProperty;
    }
}

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
    user: state.auth.user,
    games: state.myGames.myGames
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    editGame: (data: GameModel) => dispatch(new EditGame(data)),
});

export const CaEditGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGameComponent);
