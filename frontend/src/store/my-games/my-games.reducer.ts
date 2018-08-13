import { LoadStatus } from 'models';

import {
    MyGameActions,
    MyGamesActionTypes
} from './my-games.action';

import { initialState } from './my-games.initial';

export const myGamesReducer = (state = initialState, action: MyGameActions) => {
    switch (action.type) {
        case MyGamesActionTypes.InitMyGames : {
            return {
                ...state,
                myGamesStatus: LoadStatus.Fetching
            };
        }
        case MyGamesActionTypes.LoadMyGamesSuccess : {
            return {
                ...state,
                myGames: action.payload,
                myGamesStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.LoadMyGamesError : {
            return {
                ...state,
                myGamesStatus: LoadStatus.Error
            };
        }
        case MyGamesActionTypes.AddGame : {
            return {
                ...state,
                addGameStatus: LoadStatus.Fetching
            };
        }
        case MyGamesActionTypes.AddGameSuccess : {
            return {
                ...state,
                myGames: [...state.myGames, action.payload],
                addGameStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.AddGameError : {
            return {
                ...state,
                addGameStatus: LoadStatus.Error
            };
        }

        case MyGamesActionTypes.DeleteGame : {
            return {
                ...state,
                deleteGameStatus: LoadStatus.Fetching
            };
        }
        case MyGamesActionTypes.DeleteGameSuccess : {
            return {
                ...state,
                myGames: action.payload,
                deleteGameStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.DeleteGameError : {
            return {
                ...state,
                deleteGameStatus: LoadStatus.Error
            };
        }
        case MyGamesActionTypes.EditGame : {
            return {
                ...state,
                editGameStatus: LoadStatus.Fetching
            };
        }
        case MyGamesActionTypes.EditGameSuccess : {
            return {
                ...state,
                myGames: action.payload,
                editGameStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.EditGameError : {
            return {
                ...state,
                editGameStatus: LoadStatus.Error
            };
        }

        default:
        return state;
    }
};
