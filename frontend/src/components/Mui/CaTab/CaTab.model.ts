import { WithStyles } from '@material-ui/core';
import { TabProps } from '@material-ui/core/Tab';

import { Omit } from 'utils/Omit';

import { styles } from './CaTab.styles';

export interface CaTabProps extends WithStyles<typeof styles>, Omit<TabProps, 'classes'> {
}
