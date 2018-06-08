import { ErrorsTypes } from "./errors.action";
import { initialState } from './errors.initial';


export const errorsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ErrorsTypes.GetErrors: {
            return action.payload;
        }
      
        default:
            return state;
    }
}
