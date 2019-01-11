import { LoadStatus } from 'models';
import { getCurrentLanguageFromLocalStorage } from 'utils/getLanguage';

import { UserSettingsState } from './interfaces';

type State = UserSettingsState;

export const initialState: State = {
  saveLanguageStatus: LoadStatus.Init,
  saveLanguageErrors: undefined,
  language: getCurrentLanguageFromLocalStorage()
};
