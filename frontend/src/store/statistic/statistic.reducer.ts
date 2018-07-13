import { 
    StatisticAction, 
    StatisticTypes,
} from './statistic.action';

import { initialState } from './statistic.initial';

// import { isEmpty } from 'utils/isEmpty';




export const statisticReducer = (state = initialState, action: StatisticAction) => {
    switch (action.type) {
        case StatisticTypes.BestUsersInited: {
            return {
                ...state,
                bestUsers: action.payload,
                bestUsersInited: true
            }
        }

        case StatisticTypes.MostPopularGamesInited: {
            return {
                ...state,
                mostPopularGames: action.payload,
                mostPopularGamesInited: true
            }
        }

        case StatisticTypes.RecentGamesInited: {
            return {
                ...state,
                recentGames: action.payload,
                recentGamesInited: true
            }
        }

        default:
            return state;
    }
}
