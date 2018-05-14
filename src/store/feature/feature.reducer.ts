import { ApplicationActions, FeatureActionTypes } from './feature.actions';
import { initialState } from './feature.initial';

export const featureReducer = (state = initialState, action: ApplicationActions) => {
  switch (action.type) {
    case FeatureActionTypes.ADD_ITEM: {
      const item = {
        id: state.items.length + 1,
        name: action.payload
      };

      return {
        ...state,
        items: [...state.items, item]
      };
    }

    default:
      return state;
  }
}
