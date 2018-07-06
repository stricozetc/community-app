import { AuthStatus, UserFieldsToLogin } from 'models';

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
  isSnackOpen: boolean;
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
  isSnackOpen: false
};
export interface LoginFormProps {
  status: AuthStatus;
  history: any;
  errors: any;
  loginUser(user: UserFieldsToLogin): void;
}
