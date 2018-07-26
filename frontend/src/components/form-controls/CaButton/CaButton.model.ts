import { ButtonProps } from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core';
import { styles } from './CaButton.styles';
import { Omit } from 'utils/Omit';

export interface CaButtonProps extends WithStyles<typeof styles>, Omit<ButtonProps, 'classes'> {
}
