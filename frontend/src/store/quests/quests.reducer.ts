import { QuestsActions, QuestsTypes } from './quests.action';

import { initialState } from './quests.initial';

export const questsReducer = (state = initialState, action: QuestsActions) => {
  switch (action.type) {
    case QuestsTypes.QuestsInited: {
      return {
        ...state,
        quests: action.payload
      }
    }
    default:
      return state;
  }
};
