import { LoadStatus } from 'models';
import { getCurrentLanguageFromLocalStorage } from 'utils/getLanguage';

import { UserSettingsState } from './interfaces';

type State = UserSettingsState;

export const initialState: State = {
  changePasswordStatus: LoadStatus.INIT,
  changePasswordErrors: undefined,
  saveLanguageStatus: LoadStatus.INIT,
  saveLanguageErrors: undefined,
  language: getCurrentLanguageFromLocalStorage()
};
