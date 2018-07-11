import { StatisticState } from 'store/statistic/interfaces';

export interface CaUsersTablesProps {
  statistic: StatisticState
}

interface StatisticOfUser {
  [key: string]: string | number | boolean,
}
export interface CaUsersTablesState {
  value: number,
  rowData: StatisticOfUser[],
  columnDef: string[]
}
