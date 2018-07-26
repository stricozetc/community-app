
import { initialState } from './snackbarUi.initial';
import { SnackbarUiTypes, SnackbarUiActions } from './snackbarUi.action';

export const snackbarUiReducer = (state = initialState, action: SnackbarUiActions) => {

    switch (action.type) {
        case SnackbarUiTypes.OpenSnackbar: {
            return {
                ...state,
                isOpen: true
            };
        }


        case SnackbarUiTypes.CloseSnackbar: {
            return {
                ...state,
                isOpen: false
            };
        }


        case SnackbarUiTypes.ToggleSnackbar: {
            return {
                ...state,
                isOpen: !state.isOpen
            };
        }
        default:
            return state;
    }

};
