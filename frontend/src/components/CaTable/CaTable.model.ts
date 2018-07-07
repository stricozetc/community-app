
import { TableProps } from '@material-ui/core/Table';

export interface CaTableProps extends TableProps {
    rowData: any[],
    columnDef: any[]
}