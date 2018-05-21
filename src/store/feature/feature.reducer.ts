import { FeatureActions, FeatureActionTypes } from './feature.actions';
import { initialState } from './feature.initial';

export const featureReducer = (state = initialState, action: FeatureActions) => {
  switch (action.type) {
    case FeatureActionTypes.ADD_ITEM: {
      const item = {
        id: `${state.items.length + 1}`,
        name: action.payload
      };

      return {
        ...state,
        items: [...state.items, item]
      };
    }

    case FeatureActionTypes.PONG: {
      // tslint:disable-next-line:no-console
      console.log(action.payload);

      return state;
    }

    default:
      return state;
  }
}
