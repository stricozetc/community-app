import * as React from 'react';
import { connect } from 'react-redux';

import { MyGameModel } from '../../store/my-games/interfaces';
import { AppState } from '../../store/store.config';
import { FormForWorkingWithGame } from '../FormForWorkingWithGame/FormForWorkingWithGame';

import { FormForAddingNewGameState} from './EditGameComponent.model';
import { EditGame} from 'store';


export class EditGameComponent extends React.Component<any, FormForAddingNewGameState> {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        const game = this.getGame();

        return(
           <div>
               {this.props.children}
               <FormForWorkingWithGame
                    id = {this.props.match.params['idOfTheGame']}
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
    user: state.auth.user,
    games: state.myGames.myGames
});

const mapDispatchToProps = (dispatch: any) => ({
    editGame: (data: MyGameModel) => dispatch(new EditGame(data)),
});

export const CaEditGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGameComponent);
