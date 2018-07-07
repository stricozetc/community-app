import { 
    StatisticAction, 
    StatisticTypes,
} from './statistic.action';

import { initialState } from './statistic.initial';

import { isEmpty } from 'utils/isEmpty';




export const statisticReducer = (state = initialState, action: StatisticAction) => {
    switch (action.type) {
        case StatisticTypes.BestUsersInited: {
            return {
                ...state,
                bestUsers: action.payload,
                bestUsersInited: !isEmpty(action.payload)
            }
        }

        case StatisticTypes.MostPopularGamesInited: {
            return {
                ...state,
                mostPopularGames: action.payload,
                mostPopularGamesInited: !isEmpty(action.payload)
            }
        }

        case StatisticTypes.RecentGamesInited: {
            return {
                ...state,
                recentGames: action.payload,
                recentGamesInited: !isEmpty(action.payload)
            }
        }

        default:
            return state;
    }
}
