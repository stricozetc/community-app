import { HeaderName, Row } from 'models';
import { StatisticState } from 'store/statistic/interfaces';

export interface StatisticTablesProps {
  statistic: StatisticState;
}

export interface StatisticTablesState {
  activeTab: number;
  rowData: Row[];
  columnDef: HeaderName[];
  tableItemName: string;
}
