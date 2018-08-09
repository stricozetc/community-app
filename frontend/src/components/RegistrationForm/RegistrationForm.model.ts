import { AuthStatus, UserFieldsToRegister } from 'models';

export interface RegistrationFormState {
  email: string;
  name: string;
  password: string;
  passwordToRepeat: string;
  isPasswordValid: boolean;
  isEmailValid: boolean;
  isNameValid: boolean;
  isnackbarOpen: boolean;
  touched: {
    email: boolean;
    password: boolean;
    passwordToRepeat: boolean;
    name: boolean;
  };
  emailErrors: string[];
  passwordErrors: string[];
  nameErrors: string[];  
  language: string;
}

export const initRegistrationFormState: RegistrationFormState = {
  email: '',
  name: '',
  password: '',
  passwordToRepeat: '',
  isPasswordValid: false,
  isEmailValid: false,
  isNameValid: false,
  isnackbarOpen: false,
  touched: {
    email: false,
    password: false,
    passwordToRepeat: false,
    name: false
  },
  emailErrors: [],
  passwordErrors: [],
  nameErrors: [],  
  language: 'eng'
};
export interface RegistrationFormProps {
  history: any;
  status: AuthStatus;
  // errors: ErrorsFromServer;
  isSnackbarOpen: boolean;
  language: string;

  registerUser(user: UserFieldsToRegister): void;
  // closeSnackbar(): void;
//   openSnackbar(): void;
}
