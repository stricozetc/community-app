import { StatisticState } from 'store/statistic/interfaces';
import { GameModel } from 'models';

export interface ChartContainerProps {
  statistics: StatisticState;
  itemName: string;
  chartList: string[];
  games: GameModel[];
}

export interface ChartContainerState {
  chartName: string;
}
