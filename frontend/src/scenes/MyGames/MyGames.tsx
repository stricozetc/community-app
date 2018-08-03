import {CaTable} from 'components';
import * as React from 'react';

import { connect } from 'react-redux';

import { AddGame, DeleteGame, EditGame, InitMyGames } from 'store';

import './myGames.scss';
import { AppState } from '../../store/store.config';

export class CaMyGamesComponent extends React.Component<any> {
    public componentWillMount(): void {
        this.props.getMyGames(this.props.user.id);
    }

    

    public render(): JSX.Element {

        console.log(this.props.user.id);

        const columnDef = [
            { headerName: 'Game', field: 'game' },
            { headerName: 'CreatedAt', field: 'createdAt' },
            { headerName: 'UpdatedAt', field: 'updatedAt' }
        ];
        
        const rowData = [
            {
                game: {
                    name: 'JsMarathon',
                    edit: () => this.props.editGame({name: 'JsMarathon'}),
                    delete: () => this.props.deleteGame({name: 'JsMarathon'})
                },
                createdAt: '2018-07-31 13:05:33',
                updatedAt: '2018-07-31 13:05:33'
            },
            {
                game: {
                    name: 'CSSQuickDraw',
                    edit:  () => this.props.editGame({name: 'CSSQuickDraw'}),
                    delete: () => this.props.deleteGame({name: 'CSSQuickDraw'})
                },
                createdAt: '2018-07-31 13:05:33',
                updatedAt: '2018-07-31 13:05:33'
            },
            {
                game: {
                    name: 'CSSQuickDrawFull',
                    edit: () => this.props.editGame({name: 'CSSQuickDrawFull'}),
                    delete: () => this.props.deleteGame({name: 'CSSQuickDrawFull'})
                },
                createdAt: '2018-07-31 13:05:33',
                updatedAt: '2018-07-31 13:05:33'
            }
        ];

        const newGame = {
            userId: this.props.user.id,
            appName: 'My Ga2me for new User',
            desc: 'The3 best3 game in the world!',
            maxRoomPlayer: 5,
            maxRooms: 12,
            requestUrl: 'http://localh2ost:0022222',
            maxWaitingTime: 3002200
        }

        const games = this.props.games;
        const gamesWithNecessaryProperty = this.deleteUnnecessaryProperty(games, ['appName', 'createdAt', 'updatedAt, id']);
        const gameWithButtons = this.updatePropertyOfObject(gamesWithNecessaryProperty);

        console.log(`GAMES BEFORE`);
        console.log(games);

        console.log(`GAMES AFTER DELETED UNNECCESARY PROPERTY`);
        console.log(gamesWithNecessaryProperty);

        console.log(`GAMES AFTER UPDATED`);
        console.log(gameWithButtons);
        


        return(
            <div>
                {this.props.children}
                <h1 className='myGames__title'>My Games</h1>
                <CaTable rowData={rowData} columnDef={columnDef} />
                <div className='add-button-block'>
                    <button className='add-button' onClick={() => this.props.addGame(newGame)}>Add New Game</button>
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
                delete gameWithUpdatedProperty[property];

                gameWithUpdatedProperty['game'] = {
                    appName,
                    edit: () => console.log(`${appName} EDIT with ${gameWithUpdatedProperty.id} ID`),
                    delete: () => console.log(`${appName} DELETE with ${gameWithUpdatedProperty.id} ID`)
                };
                delete gameWithUpdatedProperty['id'];
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
    deleteGame: (data: object) => dispatch(new DeleteGame(data)),
    editGame: (data: object) => dispatch(new EditGame(data)),
    addGame: (data: object) => dispatch(new AddGame(data)),
    getMyGames: (userId: number) => dispatch(new InitMyGames(userId))
});

export const CaMyGames = connect(
    mapStateToProps,
    mapDispatchToProps
)(CaMyGamesComponent);
