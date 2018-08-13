import { WithStyles } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Omit } from 'utils/Omit';

import { styles } from './CaDelete.styles';

export interface CaDeleteProps extends WithStyles<typeof styles>, Omit<IconButtonProps, 'classes'> {
    deleteHandler: () => void;
}
