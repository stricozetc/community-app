import { LoadStatus } from 'models';

import {
  StatisticAction,
  StatisticTypes,
} from './statistic.action';

import { initialState } from './statistic.initial';

export const statisticReducer = (state = initialState, action: StatisticAction) => {
  switch (action.type) {

    case StatisticTypes.InitBestUsers: {
      return {
        ...state,
        bestUsersStatus: LoadStatus.Fetching
      };
    }

    case StatisticTypes.LoadBestUsersCompleted: {
      return {
        ...state,
        bestUsers: action.payload,

        bestUsersStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadBestUsersFailed: {
      return {
        ...state,
        bestUsersStatus: LoadStatus.Error
      };
    }

    case StatisticTypes.InitMostPopularGames: {
      return {
        ...state,
        mostPopularGamesStatus: LoadStatus.Fetching
      };
    }

    case StatisticTypes.LoadMostPopularGamesCompleted: {
      return {
        ...state,
        mostPopularGames: action.payload,

        mostPopularGamesStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadMostPopularGamesFailed: {
      return {
        ...state,
        mostPopularGamesStatus: LoadStatus.Error
      };
    }

    case StatisticTypes.InitRecentGames: {
      return {
        ...state,
        recentGamesStatus: LoadStatus.Fetching
      };
    }

    case StatisticTypes.LoadRecentGamesCompleted: {
      return {
        ...state,
        recentGames: action.payload,

        recentGamesStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadRecentGamesFailed: {
      return {
        ...state,
        recentGamesStatus: LoadStatus.Error
      };
    }

    case StatisticTypes.CleanStatistic: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
};
