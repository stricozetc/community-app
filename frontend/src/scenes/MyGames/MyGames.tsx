import { AppState } from '../../store/store.config';
import * as React from 'react';

import { tableCellDataType } from 'models';

import { CaTable } from 'components';
import { connect } from 'react-redux';

import { AddGame, DeleteGame, EditGame, InitMyGames } from 'store';

import './myGames.scss';

import {MyGameModel} from './MyGames.model';
import { history } from 'utils';

export class CaMyGamesComponent extends React.Component<any> {
    public componentWillMount(): void {
        this.props.getMyGames(this.props.user.id);
    }

    

    public render(): JSX.Element {
        const columnDef = [
            { headerName: 'game', field: tableCellDataType.game },
            { headerName: 'createdAt', field: tableCellDataType.creationTime },
            { headerName: 'updatedAt', field: tableCellDataType.updateTime }
        ];

        // const rowData = [
        //     {
        //         game: {
        //             name: 'JsMarathon',
        //             edit: () => console.log(`EDIT GAME`),
        //             delete: () => console.log(`DELETE GAME`),
        //         },
        //         createdAt: '2018-07-31 13:05:33',
        //         updatedAt: '2018-07-31 13:05:33'
        //     }
        // ];
        
        // const rowData = [
        //     {
        //         game: {
        //             name: 'JsMarathon',
        //             edit: () => this.props.editGame({name: 'JsMarathon'}),
        //             delete: () => this.props.deleteGame({name: 'JsMarathon'})
        //         },
        //         createdAt: '2018-07-31 13:05:33',
        //         updatedAt: '2018-07-31 13:05:33'
        //     },
        //     {
        //         game: {
        //             name: 'CSSQuickDraw',
        //             edit:  () => this.props.editGame({name: 'CSSQuickDraw'}),
        //             delete: () => this.props.deleteGame({name: 'CSSQuickDraw'})
        //         },
        //         createdAt: '2018-07-31 13:05:33',
        //         updatedAt: '2018-07-31 13:05:33'
        //     },
        //     {
        //         game: {
        //             name: 'CSSQuickDrawFull',
        //             edit: () => this.props.editGame({name: 'CSSQuickDrawFull'}),
        //             delete: () => this.props.deleteGame({name: 'CSSQuickDrawFull'})
        //         },
        //         createdAt: '2018-07-31 13:05:33',
        //         updatedAt: '2018-07-31 13:05:33'
        //     }
        // ];

        // const newGame = {
        //     userId: this.props.user.id,
        //     appName: 'My Game8 for new User',
        //     desc: 'The3 best3 game in the world!',
        //     maxRoomPlayer: 5,
        //     maxRooms: 12,
        //     requestUrl: 'http://localh2ost:8',
        //     maxWaitingTime: 3002200
        // }

        const games = this.props.games;
        const gameWithUpdatedProperty = this.updatePropertyOfObject(games);
        const rowData = this.deleteUnnecessaryProperty(
            gameWithUpdatedProperty,
            ['game', 'createdAt', 'updatedAt']
        );
        // const rowData = this.updatePropertyOfObject(gamesWithNecessaryProperty);

        // console.log(`GAMES BEFORE`);
        // console.log(games);

        // console.log(`GAMES AFTER DELETED UNNECCESARY PROPERTY`);
        // // console.log(gamesWithNecessaryProperty);

        // console.log(`GAMES AFTER UPDATED`);
        // console.log(rowData);

        return(
            <div>
                {this.props.children}
                <h1 className='myGames__title'>My Games</h1>
                <CaTable rowData={rowData} columnDef={columnDef} />
                <div className='add-button-block'>
                    {/* <button className='add-button' onClick={() => this.props.addGame(newGame)}>Add New Game</button> */}
                    <button className='add-button' onClick={() => history.push(`/my-games/add-game`)}>Add New Game</button>
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
    user: state.auth.user,
    games: state.myGames.myGames
  });

const mapDispatchToProps = (dispatch: any) => ({
    deleteGame: (gameThatNeedToDelete: MyGameModel) => dispatch(new DeleteGame(gameThatNeedToDelete)),
    editGame: (data: object) => dispatch(new EditGame(data)),
    addGame: (data: MyGameModel) => dispatch(new AddGame(data)),
    getMyGames: (userId: number) => dispatch(new InitMyGames(userId))
});

export const CaMyGames = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaMyGamesComponent);
