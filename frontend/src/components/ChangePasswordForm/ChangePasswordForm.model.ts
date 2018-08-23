import { LoadStatus } from 'models';
import { FieldsToChangePassword, FrontEndUser } from 'store';

export interface ChangePasswordFormState {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;

  isOldPasswordValid: boolean;
  isNewPasswordValid: boolean;
  isRepeatNewPasswordValid: boolean;
  touched: {
    oldPassword: boolean,
    newPassword: boolean,
    repeatNewPassword: boolean
  };
  oldPasswordErrors: string[];
  newPasswordErrors: string[];
  repeatNewPasswordErrors: string[];
}

export const initState: ChangePasswordFormState = {
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',

  isOldPasswordValid: false,
  isNewPasswordValid: false,
  isRepeatNewPasswordValid: false,

  touched: {
    oldPassword: false,
    newPassword: false,
    repeatNewPassword: false
  },

  oldPasswordErrors: [],
  newPasswordErrors: [],
  repeatNewPasswordErrors: []
};
export interface ChangePasswordFormProps {
  user: FrontEndUser | undefined;
  changePasswordStatus: LoadStatus;
  submit(data: FieldsToChangePassword): void;
}
