import { StatisticState } from 'store/statistic/interfaces';

export interface ChartContainerProps {
  statistics: StatisticState;
  itemName: string;
  chartList: string[];
}

export interface ChartContainerState {
  chartName: string;
}
