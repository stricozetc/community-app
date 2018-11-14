import { CaSelect, CircleDiagram } from 'components';
import * as React from 'react';
import { I18n, TranslationFunction } from 'react-i18next';
import { ChartsService } from 'services/charts.service';

import { StatisticState } from 'store';

import { chartsTypes } from 'models';

import { ChartContainerProps, ChartContainerState } from './ChartContainer.model';
import './ChartContainer.scss';
import { BarChart } from '../BarChart';

export class ChartContainer extends React.Component<ChartContainerProps, ChartContainerState> {
  public constructor(props: ChartContainerProps) {
    super(props);

    this.state = {
      chartName: ''
    };
  }

  public componentDidUpdate(prevProps: ChartContainerProps): void {
    if (prevProps.chartList.length !== this.props.chartList.length) {
      this.setState({
        chartName: this.props.chartList[0]
      });
    }
  }

  public handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chartName = event.target.value;

    this.setState({
      chartName
    });
  }

  public setChart = (
    chartName: string,
    statistics: StatisticState,
    itemName: string,
    t: TranslationFunction
  ) => {
    let chartComponent: JSX.Element;

    switch (chartName) {
      case chartsTypes.WinRate: {
        const diagramData = ChartsService.getWinRateData(itemName, statistics.recentGames);

        chartComponent = <CircleDiagram diagramData={diagramData} />;

        break;
      }
      case chartsTypes.WeekReport: {
        const diagramData = ChartsService.getWeekReportData(itemName, statistics.recentGames);
        const config = {
          margin: {
            top: 70,
            right: 40,
            bottom: 30,
            left: 40
          },
          animationDuration: 300,
          marginBetweenLegends: 30,
          legendRectHeight: 18,
          legendRectWidth: 18,
          ticksNumber: 5,
          legendRectMargins: 38,
          legendTextMargins: 44
        };
        chartComponent = <BarChart diagramData={diagramData} config={config} />;

        break;
      }
      default: {
        chartComponent = (
          <div className='chart-table__empty-block'>
            {t('emptyChartMessage')}
          </div>
        );

        break;
      }
    }

    return chartComponent;
  }

  public render(): JSX.Element {
    const { statistics, itemName, chartList } = this.props;

    const isItemSelected = (itemName.length !== 0)
      && (this.props.games.map(item => item.appName).indexOf(itemName) !== -1) ? true : false;

    return (
      <I18n>
        {
          (t) => (
            <div className='chart-table'>
              <div className='chart-table__title'>
                {itemName}
              </div>
              <div className='chart-table__head'>
                <div className='chart-table__chart-select'>
                  {
                    isItemSelected
                      ? <CaSelect
                        values={chartList}
                        displayedValues={chartList.map(item => t(item))}
                        handleChange={this.handleSelectChange}
                        currentValue={this.state.chartName}
                      />
                      : null
                  }
                </div>
              </div>
              <div className='chart-table__content'>
                {this.setChart(this.state.chartName, statistics, itemName, t)}
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}
