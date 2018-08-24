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

    case StatisticTypes.LoadBestUsersSuccess: {
      return {
        ...state,
        bestUsers: action.payload,

        bestUsersStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadBestUsersError: {
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

    case StatisticTypes.LoadMostPopularGamesSuccess: {
      return {
        ...state,
        mostPopularGames: action.payload,

        mostPopularGamesStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadMostPopularGamesError: {
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

    case StatisticTypes.LoadRecentGamesSuccess: {
      return {
        ...state,
        recentGames: action.payload,

        recentGamesStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadRecentGamesError: {
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

    case StatisticTypes.InitLeaders: {
      return {
        ...state,
        leadersStatus: LoadStatus.Fetching
      };
    }

    case StatisticTypes.LoadLeadersCompleted: {
      return {
        ...state,
        leaders: action.payload,

        leadersStatus: LoadStatus.Success
      };
    }

    case StatisticTypes.LoadLeadersError: {
      return {
        ...state,
        leadersStatus: LoadStatus.Error
      };
    }

    default:
      return state;
  }
};
