import {
    StatisticAction,
    StatisticTypes,
} from './statistic.action';

import { initialState } from './statistic.initial';

import { LoadStatus } from 'models';

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

                bestUsersStatus: LoadStatus.COMPLETED
            };
        }

        case StatisticTypes.LoadBestUsersFailed: {
            return {
                ...state,
                bestUsersStatus: LoadStatus.FAILED
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

                mostPopularGamesStatus: LoadStatus.COMPLETED
            };
        }

        case StatisticTypes.LoadMostPopularGamesFailed: {
            return {
                ...state,
                mostPopularGamesStatus: LoadStatus.FAILED
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

                recentGamesStatus: LoadStatus.COMPLETED
            };
        }

        case StatisticTypes.LoadRecentGamesFailed: {
            return {
                ...state,
                recentGamesStatus: LoadStatus.FAILED
            };
        }

        default:
            return state;
    }
};
