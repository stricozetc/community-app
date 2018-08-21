import { GameForm } from 'components/GameForm';
import { AuthStatus, GameForSettingForm, GameModel, SettingFormType } from 'models';
import * as React from 'react';
import { connect } from 'react-redux';
import { EditGame } from 'store';
import { AppState } from 'store/store.config';

import { EditGameComponentProps } from './EditGameComponent.model';

export class EditGameComponent extends React.Component<EditGameComponentProps> {
    constructor(props: EditGameComponentProps) {
        super(props);
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

        if (!isAuthenticated) {
            this.props.history.push('/login');
        }

        if (this.props.games.length === 0) {
            this.props.history.push('/my-games');
        }
    }

    public onSubmit = (data: GameModel) => {
      this.props.editGame(data);
    }

    public render(): JSX.Element {
        const game = this.getGame();
        const id = this.props.match.params['idOfTheGame'];

        return(
           <div>
               {this.props.children}
               <GameForm
                    id = {id}
                    userId = {this.props.user && this.props.user.id}
                    config={SettingFormType.EDIT_GAME}
                    model={game}
                    submit={this.onSubmit}
               />
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

const mapDispatchToProps = (dispatch: any) => ({
    editGame: (data: GameModel) => dispatch(new EditGame(data)),
});

export const CaEditGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGameComponent);
