import { CaButton, CaTable } from 'components';
import { AuthStatus, RowProperty, TypeOfColumn } from 'models';
import * as React from 'react';
import { connect } from 'react-redux';
import { AddGame, DeleteGame, InitMyGames } from 'store';
import { history } from 'utils';

import { CaDialog } from '../../components/form-controls/CaDialog/CaDialog';
import { AppState } from '../../store/store.config';

import { MyGameModel, MyGameProps, MyGameState } from './MyGames.model';
import './myGames.scss';

export class CaMyGamesComponent extends React.Component<MyGameProps, MyGameState> {
    public state = {
        isDialogOpen: false,
        deletedGame: null
    };

    public handleCloseDialog = () => {
        this.setState({isDialogOpen: false})
    }

    public handleOpenDialog = (game: MyGameModel) => {
        this.setState({
            isDialogOpen: true,
            deletedGame: game
        });
    }

    public handleDeleteConfirmation = () => {
        this.props.deleteGame(this.state.deletedGame);

        this.handleCloseDialog();
    }

    public componentWillMount(): void {
        const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

        if (!isAuthenticated) {
            this.props.history.push('/login');
        } else {
            this.props.getMyGames(this.props.user.id);
        }
    }

    public render(): JSX.Element {
        const columnDef = [
            { headerName: 'game',
              field: RowProperty.appName,
              type: TypeOfColumn.string,
              editAction: (id: number) => history.push(`/my-games/edit-game/${id}`),
              deleteAction: (game: MyGameModel) => this.handleOpenDialog(game)},
            { headerName: 'createdAt',
              field: RowProperty.createdAt,
              type: TypeOfColumn.date},
            { headerName: 'updatedAt',
              field: RowProperty.updatedAt,
              type: TypeOfColumn.date},
        ];

        const rowData = this.props.games;

        return(
            <div>
                {this.props.children}
                <h1 className='myGames__title'>My Games</h1>
                <CaTable rowData={rowData} columnDef={columnDef} />
                <div className='add-button-block'>
                    <CaButton
                        color='primary'
                        type='submit'
                        className='add-button'
                        onClick={() => history.push(`/my-games/add-game`)}
                        >
                        Add New Game
                    </CaButton>
                </div>
                <CaDialog
                    open={this.state.isDialogOpen}
                    onClose={this.handleCloseDialog}
                    onAccept={this.handleDeleteConfirmation}
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
    deleteGame: (gameThatNeedToDelete: MyGameModel) => dispatch(new DeleteGame(gameThatNeedToDelete)),
    addGame: (data: MyGameModel) => dispatch(new AddGame(data)),
    getMyGames: (userId: number) => dispatch(new InitMyGames(userId))
});

export const CaMyGames = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaMyGamesComponent);
