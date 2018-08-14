import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaEdit.styles';

export interface CaEditProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    editHandler: () => void;
}
