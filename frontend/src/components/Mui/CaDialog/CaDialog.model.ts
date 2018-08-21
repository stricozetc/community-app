import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaDialog.styles';

export interface CaDialogProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
}
