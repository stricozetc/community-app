import { SnackbarUiActions, SnackbarUiTypes } from './snackbarUi.action';
import { initialState } from './snackbarUi.initial';

export const snackbarUiReducer = (state = initialState, action: SnackbarUiActions) => {
  switch (action.type) {
    case SnackbarUiTypes.OpenSnackbar: {
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        message: action.payload.messages
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
