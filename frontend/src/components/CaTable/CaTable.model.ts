import { WithStyles } from '@material-ui/core';

import { styles } from './CaTable.styles';

interface HeaderName {
  headerName: string;
  field: string;
}

export interface CellWithElement {
  name: string;
  edit?: any;
  delete?: any;
}

interface Row {
  [key: string]: string | CellWithElement;
}

export interface CaTableProps extends WithStyles<typeof styles> {
  rowData: Row[];
  columnDef: HeaderName[];
}
