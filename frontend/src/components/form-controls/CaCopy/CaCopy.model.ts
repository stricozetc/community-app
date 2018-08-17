import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaCopy.styles';

export interface CaCopyProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    copyHandler?: () => void;
}
