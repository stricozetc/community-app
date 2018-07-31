import { WithStyles } from '@material-ui/core';

import { styles } from './CaTable.styles';

interface HeaderName {
  headerName: string;
  field: string;
}

export interface CaTableProps extends WithStyles<typeof styles> {
  rowData: any[];
  columnDef: HeaderName[];
}
