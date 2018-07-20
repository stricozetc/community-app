
import { TableProps } from '@material-ui/core/Table';

interface HeaderName {
  headerName: string;
  field: string;
}

export interface CaTableProps extends TableProps {
  rowData: any[];
  columnDef: HeaderName[];
}
