import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaDialogInfo.styles';

export interface CaDialogInfoProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    open: boolean;
    onClose: () => void;
    appToken: string;
}
