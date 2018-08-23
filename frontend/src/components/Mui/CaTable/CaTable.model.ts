import { WithStyles } from '@material-ui/core';
import { HeaderName, Row } from 'models';

import { styles } from './CaTable.styles';

export interface CaTableProps extends WithStyles<typeof styles> {
  rowData: Row[];
  columnDef: HeaderName[];
  handleRowClick?: (item: Row) => void;
}
