import { IconButtonProps } from '@material-ui/core/IconButton';
import { VkSuccessResponse } from 'models';

export interface VkDialogProps extends IconButtonProps {
  apiId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: (response: VkSuccessResponse, email: string) => void;
}

export interface VkDialogState {
  isEmailValid: boolean;
  isOpenVkWidget: boolean;
  email: string;
  touched: {
    email: boolean;
  };
  emailErrors: string[];
}

export const initVkDialogState: VkDialogState = {
  isEmailValid: false,
  isOpenVkWidget: false,
  email: '',
  touched: {
    email: false,
  },
  emailErrors: [],
};
