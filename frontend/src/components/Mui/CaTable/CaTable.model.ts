import { HeaderName, Row } from 'models';

export interface CaTableProps {
  rowData: Row[];
  columnDef: HeaderName[];
  handleRowClick?: (item: Row) => void;
}
