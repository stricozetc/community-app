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
        bestUsersStatus: LoadStatus.FETCHING
      };
    }

    case StatisticTypes.LoadBestUsersCompleted: {
      return {
        ...state,
        bestUsers: action.payload,

        bestUsersStatus: LoadStatus.SUCCESS
      };
    }

    case StatisticTypes.LoadBestUsersError: {
      return {
        ...state,
        bestUsersStatus: LoadStatus.ERROR
      };
    }

    case StatisticTypes.InitMostPopularGames: {
      return {
        ...state,
        mostPopularGamesStatus: LoadStatus.FETCHING
      };
    }

    case StatisticTypes.LoadMostPopularGamesCompleted: {
      return {
        ...state,
        mostPopularGames: action.payload,

        mostPopularGamesStatus: LoadStatus.SUCCESS
      };
    }

    case StatisticTypes.LoadMostPopularGamesError: {
      return {
        ...state,
        mostPopularGamesStatus: LoadStatus.ERROR
      };
    }

    case StatisticTypes.InitRecentGames: {
      return {
        ...state,
        recentGamesStatus: LoadStatus.FETCHING
      };
    }

    case StatisticTypes.LoadRecentGamesCompleted: {
      return {
        ...state,
        recentGames: action.payload,

        recentGamesStatus: LoadStatus.SUCCESS
      };
    }

    case StatisticTypes.LoadRecentGamesError: {
      return {
        ...state,
        recentGamesStatus: LoadStatus.ERROR
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
