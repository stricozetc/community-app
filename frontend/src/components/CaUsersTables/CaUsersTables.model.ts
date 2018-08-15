import { HeaderName, Row } from 'models';
import { StatisticState } from 'store/statistic/interfaces';

export interface CaUsersTablesProps {
  statistic: StatisticState;
}

export interface CaUsersTablesState {
  activeTab: number;
  rowData: Row[];
  columnDef: HeaderName[];
  tableItemName: string;
}
