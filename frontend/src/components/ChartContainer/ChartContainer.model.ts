import { StatisticState } from 'store/statistic/interfaces';

import { chartCategories } from 'models';

export interface ChartTableProps {
  statistics: StatisticState;
  itemName: string;
  chartList: string[];
  chartCategory: chartCategories;
}

export interface ChartTableState {
  chartName: string;
}
