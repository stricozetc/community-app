import { DataActions, DataTypes } from './data.action';

import { initialState } from './data.initial';



export const dataReducer = (state = initialState, action: DataActions) => {
    switch (action.type) {
        case DataTypes.LoadData: {
            return {
                ...state,
                fetchingData: true,
            }
        }

        case DataTypes.DataIsLoaded: {
            return {
                ...state,
                fetchingData: false
            }
        }
        default:
            return state;
    }
}
