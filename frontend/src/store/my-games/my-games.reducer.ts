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
        case MyGamesActionTypes.LoadMyGamesCompleted : {
            return {
                ...state,
                myGames: action.payload,
                myGamesStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.LoadMyGamesFailed : {
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
        case MyGamesActionTypes.AddGameCompleted : {
            return {
                ...state,
                myGames: [...state.myGames, action.payload],
                addGameStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.AddGameFailed : {
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
        case MyGamesActionTypes.DeleteGameCompleted : {
            return {
                ...state,
                myGames: action.payload,
                deleteGameStatus: LoadStatus.Success
            };
        }
        case MyGamesActionTypes.DeleteGameFailed : {
            return {
                ...state,
                deleteGameStatus: LoadStatus.Error
            };
        }

        default:
        return state;
    }
}