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
};
export interface LoginFormProps {
  status: AuthStatus;
  history: any;
  errors: any;
  isSnackbarOpen: boolean;
  
  loginUser(user: UserFieldsToLogin): void;

  closeSnackbar(): void;

  openSnackbar():void;
}
