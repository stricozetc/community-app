import { AuthStatus } from 'models';
import * as React from 'react';
import { connect } from 'react-redux';
import { AddGame, LogoutUser } from 'store';

import { MyGameModel } from '../../store/my-games/interfaces';
import { AppState } from '../../store/store.config';
import { FormForWorkingWithGame } from '../FormForWorkingWithGame/FormForWorkingWithGame';

import { FormForAddingNewGameState, initFormForAddingNewGame } from './AddGameComponent.model';
export class AddGameComponent extends React.Component<any, FormForAddingNewGameState> {
    constructor(props: any) {
        super(props);
        this.state = initFormForAddingNewGame;
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

        if (!isAuthenticated) {
            this.props.history.push('/login');
        } else {
            if (!(this.props.games.length > 0)) {
                this.props.history.push('/my-games');
            }
        }
    }

    public shouldComponentUpdate(nextProps: any): boolean {
        return !!nextProps.user;
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
    authStatus: state.auth.status,
    user: state.auth.user,
    games: state.myGames.myGames
});

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(new LogoutUser()),
    addGame: (data: MyGameModel) => dispatch(new AddGame(data)),
});

export const CaAddGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGameComponent);
