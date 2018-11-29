import { HeaderName, Row } from 'models';
import { StatisticState } from 'store/statistic/interfaces';
import { GamesState } from 'store';

export interface StatisticTablesProps {
  statistic: StatisticState;
  games: GamesState;
}

export interface StatisticTablesState {
  activeTab: number;
  rowData: Row[];
  columnDef: HeaderName[];
  tableItemName: string;
}
