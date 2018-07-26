import { GamesActions, GamesTypes } from './games.action';

import { initialState } from './games.initial';

import { LoadStatus } from 'models';

export const gamesReducer = (state = initialState, action: GamesActions) => {
    switch (action.type) {
        case GamesTypes.InitGames: {
            return {
                ...state,
                gamesStatus: LoadStatus.FETCHING
            };
        }
        case GamesTypes.LoadGamesCompleted: {
            return {
                ...state,
                games: action.payload,
                gamesStatus: LoadStatus.COMPLETED
            };
        }
        case GamesTypes.LoadGamesFailed: {
            return {
                ...state,
                gamesStatus: LoadStatus.FAILED
            };
        }
        default:
            return state;
    }
};
