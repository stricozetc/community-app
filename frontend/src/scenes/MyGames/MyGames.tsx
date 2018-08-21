import { CaButton, CaDialogInfo, CaTable } from 'components';
import { CaDialog } from 'components/form-controls/CaDialog/CaDialog';
import { AuthStatus, GameModel, RowProperty, TypeOfColumn } from 'models';
import * as React from 'react';
import { connect } from 'react-redux';
import { AddGame, DeleteGame, InitMyGames } from 'store';
import { AppState } from 'store/store.config';
import { history } from 'utils';

import { MyGameProps, MyGameState } from './MyGames.model';
import './myGames.scss';

export class CaMyGamesComponent extends React.Component<MyGameProps, MyGameState> {
    public state = {
        isDialogOpen: false,
        isPopoverOpen: false,
        deletedGame: null,
        appTokenInPopover: ''
    };

    public handleCloseDialog = () => {
        this.setState({isDialogOpen: false})
    }

    public handleClosePopover = () => {
        this.setState({isPopoverOpen: false})
    }

    public handleOpenDialog = (game: GameModel) => {
        this.setState({
            isDialogOpen: true,
            deletedGame: game
        });
    }

    public handleOpenPopover = (appToken: string) => {
        this.setState({
            isPopoverOpen: true,
            appTokenInPopover: appToken
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
              field: RowProperty.APP_NAME,
              type: TypeOfColumn.STRING,
              editAction: (id: number) => history.push(`/my-games/edit-game/${id}`),
              deleteAction: (game: GameModel) => this.handleOpenDialog(game),
              lockAction: (appToken: string) => this.handleOpenPopover(appToken)},
            { headerName: 'createdAt',
              field: RowProperty.CREATED_AT,
              type: TypeOfColumn.DATE},
            { headerName: 'updatedAt',
              field: RowProperty.UPDATED_AT,
              type: TypeOfColumn.DATE},
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
                <CaDialogInfo onClose={this.handleClosePopover} open={this.state.isPopoverOpen} appToken={this.state.appTokenInPopover}/>
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
    deleteGame: (gameThatNeedToDelete: GameModel) => dispatch(new DeleteGame(gameThatNeedToDelete)),
    addGame: (data: GameModel) => dispatch(new AddGame(data)),
    getMyGames: (userId: number) => dispatch(new InitMyGames(userId))
});

export const CaMyGames = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaMyGamesComponent);
