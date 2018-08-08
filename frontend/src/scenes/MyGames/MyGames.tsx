import { AppState } from '../../store/store.config';
import * as React from 'react';

import { tableCellDataType } from 'models';

import { CaTable } from 'components';
import { connect } from 'react-redux';

import { AddGame, DeleteGame, EditGame, InitMyGames, LogoutUser } from 'store';

import './myGames.scss';

import {MyGameModel} from './MyGames.model';
import { history } from 'utils';
// import { isEmpty } from 'utils/isEmpty';

import { CaButton } from 'components';
import {
    AuthStatus,
  } from 'models';
export class CaMyGamesComponent extends React.Component<any> {
    public componentWillMount(): void {
        this.props.getMyGames(this.props.user.id);

        const isAuthenticated = this.props.authStatus === AuthStatus.AUTHORIZED;

        if (!isAuthenticated) {
        this.props.history.push('/login');
        }

        // if (isEmpty(this.props.games)) {
        // this.props.initGames();
        // }
    }

    

    public render(): JSX.Element {
        const columnDef = [
            { headerName: 'game', field: tableCellDataType.game },
            { headerName: 'createdAt', field: tableCellDataType.creationTime },
            { headerName: 'updatedAt', field: tableCellDataType.updateTime }
        ];

        const games = this.props.games;
        const gameWithUpdatedProperty = this.updatePropertyOfObject(games);
        const rowData = this.deleteUnnecessaryProperty(
            gameWithUpdatedProperty,
            ['game', 'createdAt', 'updatedAt']
        );

        return(
            <div>
                {this.props.children}
                <h1 className='myGames__title'>My Games</h1>
                <CaTable rowData={rowData} columnDef={columnDef} />
                <div className='add-button-block'>
                    {/* <button className='add-button' onClick={() => this.props.addGame(newGame)}>Add New Game</button> */}
                    {/* <button className='add-button' onClick={() => history.push(`/my-games/add-game`)}>Add New Game</button> */}
                    <CaButton
                        color='primary'
                        type='submit'
                        className='add-button'
                        onClick={() => history.push(`/my-games/add-game`)}
                        >
                        Add New Game
                    </CaButton>
                </div>
            </div>
        );
    }

    public isArrayEmpty(arrayOfData: any[]): boolean {
        return !Array.isArray(arrayOfData) || !arrayOfData.length;
    }

    public deleteUnnecessaryProperty(arrayOfGames: any[], arrayOfNecessaryProperty: string[]): any[] {
        const newArrayOfGames = arrayOfGames.map(game => {

          const gameWithNecessaryProperty = { ...game };

          for (const property in gameWithNecessaryProperty) {
            if (!(arrayOfNecessaryProperty.indexOf(property) + 1)) {
              delete gameWithNecessaryProperty[property];
            }
          }
          return gameWithNecessaryProperty;
        });

        return newArrayOfGames;
    }

    public updatePropertyOfObject(arrayOfGames: any[]): any[] {
        const newArrayOfGames = arrayOfGames.map(game => {

          const gameWithUpdatedProperty = { ...game };

          for (const property in gameWithUpdatedProperty) {
            if (property === 'appName') {
                const appName = gameWithUpdatedProperty[property];
                const id = gameWithUpdatedProperty['id'];
                const copyOfTheGame = Object.assign({}, gameWithUpdatedProperty);

                gameWithUpdatedProperty['game'] = {
                    appName,
                    edit: () => history.push(`/my-games/edit-game/${id}`),
                    delete: () => this.props.deleteGame(copyOfTheGame)
                };
            }
          }

          return gameWithUpdatedProperty;
        });

        return newArrayOfGames;
      }
}

const mapStateToProps = (state: AppState) => ({
    authStatus: state.auth.status,
    user: state.auth.user,
    games: state.myGames.myGames
  });

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(new LogoutUser()),
    deleteGame: (gameThatNeedToDelete: MyGameModel) => dispatch(new DeleteGame(gameThatNeedToDelete)),
    editGame: (data: MyGameModel) => dispatch(new EditGame(data)),
    addGame: (data: MyGameModel) => dispatch(new AddGame(data)),
    getMyGames: (userId: number) => dispatch(new InitMyGames(userId))
});

export const CaMyGames = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaMyGamesComponent);
