import { ErrorsFromServer, RestorePasswordStatus } from 'models';

export interface ForgetPasswordState {
  email: string;
  isEmailValid: boolean;
  emailErrors: string[];
  isTouched: boolean;
}

export const initForgetPasswordState: ForgetPasswordState = {
  email: '',
  isEmailValid: false,
  isTouched: false,
  emailErrors: [],
};

export interface ForgetPasswordProps {
  status: RestorePasswordStatus;
  errors: ErrorsFromServer;
  isSnackbarOpen: boolean;
  sendRestoreRequest(userEmail: string): void;
  closeSnackbar(): void;
  openSnackbar(): void;
  resetRequest(): void;
}
