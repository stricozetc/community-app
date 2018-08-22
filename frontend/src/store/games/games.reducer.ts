import { LoadStatus } from 'models';

import { GamesActions, GamesTypes } from './games.action';
import { initialState } from './games.initial';

export const gamesReducer = (state = initialState, action: GamesActions) => {

  switch (action.type) {
    case GamesTypes.LoadGames: {
      return {
        ...state,
        gamesStatus: LoadStatus.Fetching
      };
    }
    case GamesTypes.LoadGamesSuccess: {
      return {
        ...state,
        games: action.payload,
        gamesStatus: LoadStatus.Success
      };
    }
    case GamesTypes.LoadGamesError: {
      return {
        ...state,
        gamesStatus: LoadStatus.Error
      };
    }
    default:
      return state;
  }

};
