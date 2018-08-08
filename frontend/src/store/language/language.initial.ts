import { LanguageStatus } from 'models';
import { getCurrentLanguageFromLocalStorage } from 'utils/getLanguage';

import { LanguageState } from './interfaces';

type State = LanguageState;

export const initialState: State = {
  status: LanguageStatus.INIT,
  language: getCurrentLanguageFromLocalStorage(),
};
