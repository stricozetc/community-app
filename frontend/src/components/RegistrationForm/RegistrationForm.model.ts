import { History } from 'history';

import { AuthStatus, UserFieldsToRegister } from 'models';

export interface RegistrationFormState {
  email: string;
  name: string;
  password: string;
  passwordToRepeat: string;
  isPasswordValid: boolean;
  isPasswordToRepeatValid: boolean;
  isEmailValid: boolean;
  isNameValid: boolean;
  isSnackbarOpen: boolean;
  touched: {
    email: boolean;
    password: boolean;
    passwordToRepeat: boolean;
    name: boolean;
  };
  emailErrors: string[];
  passwordErrors: string[];
  passwordToRepeatErrors: string[];
  nameErrors: string[];
  language: string;
  isVkDialogOpen: boolean;
  isSpinnerRun: boolean;
}

export const initRegistrationFormState: RegistrationFormState = {
  email: '',
  name: '',
  password: '',
  passwordToRepeat: '',
  isPasswordValid: false,
  isPasswordToRepeatValid: false,
  isEmailValid: false,
  isNameValid: false,
  isSnackbarOpen: false,
  touched: {
    email: false,
    password: false,
    passwordToRepeat: false,
    name: false
  },
  emailErrors: [],
  passwordErrors: [],
  passwordToRepeatErrors: [],
  nameErrors: [],
  language: 'eng',
  isVkDialogOpen: false,
  isSpinnerRun: false
};
export interface RegistrationFormProps {
  history: History;
  status: AuthStatus;
  spinnerRun: boolean;

  language: string;

  registerUser(user: UserFieldsToRegister): void;
}
