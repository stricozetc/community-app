import { ButtonProps as _ButtonProps} from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core';
import { styles } from './Button.styles';
import { Omit } from 'utils/Omit';

export interface ButtonProps extends WithStyles<typeof styles>, Omit<_ButtonProps, 'classes'> {
}
