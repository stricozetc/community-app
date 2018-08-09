import { AuthStatus } from 'models';
import * as React from 'react';
import { connect } from 'react-redux';
import { EditGame, LogoutUser } from 'store';

import { MyGameModel } from '../../store/my-games/interfaces';
import { AppState } from '../../store/store.config';
import { FormForWorkingWithGame } from '../FormForWorkingWithGame/FormForWorkingWithGame';

import { FormForAddingNewGameState } from './EditGameComponent.model';

export class EditGameComponent extends React.Component<any, FormForAddingNewGameState> {
    constructor(props: any) {
        super(props);
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

        if (!isAuthenticated) {
            this.props.history.push('/login');
        }
    }
    //When you use component (instead of render or children, below) the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component prop, you would create a new component every render.So  when we use render in Root component we can't check authorization user in componentWillMount.
    public shouldComponentUpdate(nextProps: any): boolean {
        return !!nextProps.user;
    }

    public render(): JSX.Element {
        const game = this.getGame();
        const id = this.props.match.params['idOfTheGame'];

        return(
           <div>
               {this.props.children}
               <FormForWorkingWithGame
                    id = {id}
                    userId = {this.props.user.id}
                    config='Edit Game'
                    model={game}
                    submit={(data: MyGameModel) => this.props.editGame(data)}
               />
           </div>
        );
    }

    public getGame(): any {

        const idOfTheGameThatNeedToEdit = this.props.match.params['idOfTheGame'];
        const myGames = this.props.games;

        const gameDataFromStore = Object.assign({}, myGames.find((game: any) => game.id === +idOfTheGameThatNeedToEdit));
        return this.deleteUnnecessaryProperty(
            gameDataFromStore,
            ['appName', 'description', 'maxRoomPlayer', 'maxRooms', 'requestUrl', 'maxWaitingTime']
        );
    }

    public deleteUnnecessaryProperty(object: any, arrayOfNecessaryProperty: string[]): any[] {
        const gameWithNecessaryProperty = { ...object };

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
    logoutUser: () => dispatch(new LogoutUser()),
    editGame: (data: MyGameModel) => dispatch(new EditGame(data)),
});

export const CaEditGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGameComponent);
