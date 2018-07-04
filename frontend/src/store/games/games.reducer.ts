import { GamesActions , GamesTypes } from './games.action';

import { initialState } from './games.initial';



export const gamesReducer = (state = initialState, action: GamesActions) => {
    switch (action.type) {
        case GamesTypes.GamesInited: {
            return {
                ...state,
                games: action.payload
            }
        }
        default:
            return state;
    }
}
