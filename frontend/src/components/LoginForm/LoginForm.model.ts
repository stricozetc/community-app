import { AuthStatus, UserFieldsToLogin } from 'models';

export interface LoginFormState {
  email: string;
  password: string;
  isPasswordValid: boolean;
  isEmailValid: boolean;
  isnackbarOpen: boolean;
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
  isnackbarOpen: false,
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

  loginUser(user: UserFieldsToLogin): void;  
}
