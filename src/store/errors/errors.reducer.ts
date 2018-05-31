import { ErrorsTypes } from "./errors.action";
import { initialState } from './errors.initial';


export const errorsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ErrorsTypes.GET_ERRORS: {
            return action.payload;
        }
      
        default:
            return state;
    }
}
