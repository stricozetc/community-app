import { History } from 'history';

import {
  AuthStatus,
  SocialNetworksUser,
  UserFieldsToLogin,
} from 'models';

export interface LoginFormState {
  email: string;
  password: string;
  isPasswordValid: boolean;
  isEmailValid: boolean;
  touched: {
    email: boolean;
    password: boolean;
  };
  emailErrors: string[];
  passwordErrors: string[];
  isVkDialogOpen: boolean;
  isSpinnerRun: boolean;
}

export const initLoginFormState: LoginFormState = {
  email: '',
  password: '',
  isPasswordValid: false,
  isEmailValid: false,
  touched: {
    email: false,
    password: false
  },
  emailErrors: [],
  passwordErrors: [],
  isVkDialogOpen: false,
  isSpinnerRun: false
};

export interface LoginFormProps {
  status: AuthStatus;
  history: History;
  spinnerRun: boolean;

  loginUser(user: UserFieldsToLogin): void;
  socialNetworksLogin(socialNetworksUser: SocialNetworksUser): void;
}
