import { CircleDiagram } from 'components/CircleDiagram';
import * as React from 'react';
import { I18n, TranslationFunction } from 'react-i18next';
import { ChartsService } from 'services/charts.service';

import { StatisticState } from 'store';

import { chartsTypes } from 'models';

import { CaSelect } from '../form-controls/CaSelect';

import { ChartContainerProps, ChartContainerState } from './ChartContainer.model';
import './ChartContainer.scss';

export class ChartContainer extends React.Component<ChartContainerProps, ChartContainerState> {
  public constructor(props: ChartContainerProps) {
    super(props);

    this.state = {
      chartName: ''
    };
  }

  public componentDidUpdate(prevProps: ChartContainerProps): void {
    if (prevProps.chartList !== this.props.chartList) {
      this.setState({
        chartName: this.props.chartList[0] || ''
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
      case chartsTypes.WIN_RATE: {
        const diagramData = ChartsService.getWinRateData(itemName, statistics.recentGames);

        chartComponent = <CircleDiagram diagramData={diagramData} />;

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

    const isItemSelected = itemName.length !== 0 ? true : false;

    return (
      <I18n>
        {
          ( t ) => (
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
