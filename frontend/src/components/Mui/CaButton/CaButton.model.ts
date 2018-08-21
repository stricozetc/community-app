import { WithStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { Omit } from 'utils/Omit';

import { styles } from './CaButton.styles';

export interface CaButtonProps extends WithStyles<typeof styles>, Omit<ButtonProps, 'classes'> {
}
