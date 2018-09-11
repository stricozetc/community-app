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
  isSnackbarOpen: boolean;
  touched: {
    email: boolean;
    password: boolean;
  };
  emailErrors: string[];
  passwordErrors: string[];
}

export const initLoginFormState: LoginFormState = {
  email: '',
  password: '',
  isPasswordValid: false,
  isEmailValid: false,
  isSnackbarOpen: false,
  touched: {
    email: false,
    password: false
  },
  emailErrors: [],
  passwordErrors: [],
};

export interface LoginFormProps {
  status: AuthStatus;
  history: History;

  loginUser(user: UserFieldsToLogin): void;
  socialNetworksLogin(socialNetworksUser: SocialNetworksUser): void;
}
