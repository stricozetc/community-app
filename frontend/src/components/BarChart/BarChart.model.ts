import { Margin, WeekReportData } from 'models';

export interface BarChartProps {
  diagramData: WeekReportData[];
  config: BarChartConfig;
}

export interface BarChartConfig {
  margin: Margin;
  animationDuration: number;
  marginBetweenLegends: number;
  legendRectWidth: number;
  legendRectHeight: number;
  ticksNumber: number;
  legendRectMargins: number;
  legendTextMargins: number;
}
