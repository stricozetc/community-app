import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaLock.styles';

export interface CaLockProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    showAppToken: () => void;
}
