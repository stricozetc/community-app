import * as React from 'react';

import { CaTab, CaTable, CaTabs } from 'components';

import {
  HeaderName,
  JsMarathonCharts,
  MyGameCharts,
  Row,
  RowProperty,
  StatTab,
  TypeOfColumn,
  chartsTypes
} from 'models';

import { I18n } from 'react-i18next';

import { ChartContainer } from '../ChartContainer';

import { CaUsersTablesProps, CaUsersTablesState } from './CaUsersTables.model';

import './CaUsersTables.scss';

export class CaUsersTables extends React.Component<CaUsersTablesProps, CaUsersTablesState> {
  constructor(props: CaUsersTablesProps) {
    super(props);
    this.state = {
      activeTab: 0,
      rowData: [],
      columnDef: [],
      tableItemName: ''
    };
  }

  public componentWillMount(): void {
    this.changeContent(StatTab.BEST_USERS);
  }

  public handleRowClick = (item: Row) => {
    switch (this.state.activeTab) {
      case StatTab.THE_MOST_POPULAR_GAMES:
      case StatTab.RECENT_GAMES: {
        this.setState({
          tableItemName: item.game
        });

        break;
      }
      case StatTab.BEST_USERS: {
        this.setState({
          tableItemName: item.name
        });

        break;
      }
      default: {
        this.setState({
          tableItemName: ''
        });

        break;
      }
    }
  }

  public getChartList = (itemNate: string) => {
    let chartList: string[];

    switch (itemNate) {
      case 'JsMarathon': {
        chartList = [...JsMarathonCharts];

        break;
      }
      case 'MyGame': {
        chartList = [...MyGameCharts];

        break;
      }
      default: {
        chartList = [chartsTypes.NO_CHARTS_AVAILABLE];

        break;
      }
    }

    return chartList;
  }

  public render(): JSX.Element {
    return (
      <I18n>
        {
          ( t ) => (
            <div className='ca-users-tables'>
              <div className='ca-users-tables__statistics'>
                <h2 className='ca-users-tables__statistics-title'>{t('statistics')}</h2>
                <CaTabs value={this.state.activeTab}>
                  <CaTab
                    label={t('bestUsersLabel')}
                    onClick={() => this.changeContent(StatTab.BEST_USERS)}
                  />
                  <CaTab
                    label={t('mostPopularGamesLabel')}
                    onClick={() => this.changeContent(StatTab.THE_MOST_POPULAR_GAMES)}
                  />
                  <CaTab
                    label={t('recentGamesLabel')}
                    onClick={() => this.changeContent(StatTab.RECENT_GAMES)}
                  />
                </CaTabs>

                <CaTable rowData={this.state.rowData} columnDef={this.state.columnDef} handleRowClick={this.handleRowClick} />
              </div>
              <div className='ca-users-tables__charts'>
                <h2 className='ca-users-tables__charts-title'>{t('charts')}</h2>
                <div className='ca-users-tables__chart-container'>
                  <ChartContainer
                    statistics={this.props.statistic}
                    itemName={this.state.tableItemName}
                    chartList={this.getChartList(this.state.tableItemName)}
                  />
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }

  public getNameOfHeaders(tableHeadersName: any, statistic: object): string[] {
    const propertyNames = Object.keys(statistic);
    const headersName: string[] = [];

    propertyNames.forEach(property => {
      if (tableHeadersName[property]) {
        headersName.push(tableHeadersName[property]);
      }
    });

    return [...headersName];
  }

  public changeContent(activeTab: number): void {

    switch (activeTab) {
      case StatTab.BEST_USERS: {

        const columnDef = [
          {
            headerName: 'userName',
            field: RowProperty.NAME,
            type: TypeOfColumn.STRING
          },
          {
            headerName: 'playedTime',
            field: RowProperty.PLAYED_TIME,
            type: TypeOfColumn.TIME_COUNT
          },
          {
            headerName: 'score',
            field: RowProperty.SCORES,
            type: TypeOfColumn.POINTS
          },
        ];
        const bestUsers = [...this.props.statistic.bestUsers];

        if (!this.isArrayEmpty(bestUsers)) {
          const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

          const rowData = this.checkPropertyOfObject(bestUsers, arrayOfNecessaryProperty);

          this.setState({
            activeTab,
            rowData,
            columnDef
          });
        } else {
          this.setState({
            activeTab,
            rowData: [],
            columnDef
          });
        }
        break;
      }

      case StatTab.THE_MOST_POPULAR_GAMES: {

        const columnDef = [
          {
            headerName: 'game',
            field: RowProperty.GAME,
            type: TypeOfColumn.STRING
          },
          {
            headerName: 'playedInWeek',
            field: RowProperty.PLAYED_IN_WEEK,
            type: TypeOfColumn.TIME_COUNT
          },
          {
            headerName: 'playedAll',
            field: RowProperty.PLAYED_TIME,
            type: TypeOfColumn.TIME_COUNT
          },
        ];
        const mostPopularGames = [...this.props.statistic.mostPopularGames];

        if (!this.isArrayEmpty(mostPopularGames)) {
          const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

          const rowData = this.checkPropertyOfObject(mostPopularGames, arrayOfNecessaryProperty);

          this.setState({
            activeTab,
            rowData,
            columnDef
          });
        } else {
          this.setState({
            activeTab,
            rowData: [],
            columnDef
          });
        }
        break;
      }

      case StatTab.RECENT_GAMES: {

        const columnDef = [
          {
            headerName: 'game',
            field: RowProperty.GAME,
            type: TypeOfColumn.STRING
          },
          {
            headerName: 'score',
            field: RowProperty.SCORES,
            type: TypeOfColumn.POINTS
          },
          {
            headerName: 'result',
            field: RowProperty.RESULT,
            type: TypeOfColumn.RESULT
          },
        ];
        const recentGames = [...this.props.statistic.recentGames] || [];

        if (!this.isArrayEmpty(recentGames)) {
          const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

          const rowData = this.checkPropertyOfObject(recentGames, arrayOfNecessaryProperty);

          this.setState({
            activeTab,
            rowData,
            columnDef
          });
        } else {
          this.setState({
            activeTab,
            rowData: [],
            columnDef
          });
        }
        break;
      }
      default:
        break;
    }
  }

  public isArrayEmpty(arrayOfData: any[]): boolean {
    return !Array.isArray(arrayOfData) || !arrayOfData.length;
  }

  public getNecessaryProperty(columnDef: HeaderName[]): string[] {
    return columnDef.map(column => column.field);
  }

  public checkPropertyOfObject(arrayOfData: Row[], arrayOfNecessaryProperty: string[]): any[] {

    const newArrayOfData = arrayOfData.map(userStatistic => {
      const newUserStatistic = { ...userStatistic };
      arrayOfNecessaryProperty.forEach(necessaryProperty => {
        if (newUserStatistic[necessaryProperty] === undefined || newUserStatistic[necessaryProperty] === null) {
          newUserStatistic[necessaryProperty] = '-';
        }

      });
      return newUserStatistic;
    });

    return [...newArrayOfData];
  }
}
