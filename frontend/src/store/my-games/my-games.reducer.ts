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
                myGamesStatus: LoadStatus.FETCHING
            };
        }
        case MyGamesActionTypes.LoadMyGamesSuccess : {
            return {
                ...state,
                myGames: action.payload,
                myGamesStatus: LoadStatus.SUCCESS
            };
        }
        case MyGamesActionTypes.LoadMyGamesError : {
            return {
                ...state,
                myGamesStatus: LoadStatus.ERROR
            };
        }
        case MyGamesActionTypes.AddGame : {
            return {
                ...state,
                addGameStatus: LoadStatus.FETCHING
            };
        }
        case MyGamesActionTypes.AddGameSuccess : {
            return {
                ...state,
                myGames: [...state.myGames, action.payload],
                addGameStatus: LoadStatus.SUCCESS
            };
        }
        case MyGamesActionTypes.AddGameError : {
            return {
                ...state,
                addGameStatus: LoadStatus.ERROR
            };
        }

        case MyGamesActionTypes.DeleteGame : {
            return {
                ...state,
                deleteGameStatus: LoadStatus.FETCHING
            };
        }
        case MyGamesActionTypes.DeleteGameSuccess : {
            return {
                ...state,
                myGames: action.payload,
                deleteGameStatus: LoadStatus.SUCCESS
            };
        }
        case MyGamesActionTypes.DeleteGameError : {
            return {
                ...state,
                deleteGameStatus: LoadStatus.ERROR
            };
        }
        case MyGamesActionTypes.EditGame : {
            return {
                ...state,
                editGameStatus: LoadStatus.FETCHING
            };
        }
        case MyGamesActionTypes.EditGameSuccess : {
            return {
                ...state,
                myGames: action.payload,
                editGameStatus: LoadStatus.SUCCESS
            };
        }
        case MyGamesActionTypes.EditGameError : {
            return {
                ...state,
                editGameStatus: LoadStatus.ERROR
            };
        }

        default:
        return state;
    }
};
