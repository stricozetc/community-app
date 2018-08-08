import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../store/store.config';

import { AddGame} from 'store';
import { FormForAddingNewGameState, initFormForAddingNewGame } from './AddGameComponent.model';
import { FormForWorkingWithGame } from '../FormForWorkingWithGame/FormForWorkingWithGame';
import { MyGameModel } from '../../store/my-games/interfaces';


export class AddGameComponent extends React.Component<any, FormForAddingNewGameState> {
    constructor(props: any) {
        super(props);
        this.state = initFormForAddingNewGame;
    }

    public render(): JSX.Element {
        return(
           <div>
                {this.props.children}
               <FormForWorkingWithGame
                    userId = {this.props.user.id}
                    config='Add Game'
                    model={initFormForAddingNewGame}
                    submit={(data: MyGameModel) => this.props.addGame(data)}
               />
           </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: any) => ({
    addGame: (data: MyGameModel) => dispatch(new AddGame(data)),
});

export const CaAddGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGameComponent);
