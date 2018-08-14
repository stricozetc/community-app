import * as React from 'react';

import { Tab, Tabs, withStyles } from '@material-ui/core';
import { CaTable } from 'components';

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

import { styles } from './CaUsersTables.styles';

import './CaUsersTables.scss';

export const CaUsersTables = withStyles(styles)(
  class extends React.Component<CaUsersTablesProps, CaUsersTablesState> {
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
      this.changeContent(StatTab.BestUsers);
    }

    public handleRowClick = (item: any) => {
      switch (this.state.activeTab) {
        case StatTab.TheMostPopularGames:
        case StatTab.RecentGames: {
          this.setState({
            tableItemName: item.game
          });

          break;
        }
        case StatTab.BestUsers: {
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
          chartList = [chartsTypes.noChartsAvailable];

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
                  <Tabs value={this.state.activeTab}>
                    <Tab
                      label={t('bestUsersLabel')}
                      onClick={() => this.changeContent(StatTab.BestUsers)}
                      classes={{ label: this.props.classes.label }} />
                    <Tab
                      label={t('mostPopularGamesLabel')}
                      onClick={() => this.changeContent(StatTab.TheMostPopularGames)}
                      classes={{ label: this.props.classes.label }}
                    />
                    <Tab
                      label={t('recentGamesLabel')}
                      onClick={() => this.changeContent(StatTab.RecentGames)}
                      classes={{ label: this.props.classes.label }} />
                  </Tabs>

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
        case StatTab.BestUsers: {

          const columnDef = [
            { headerName: 'userName',
              field: RowProperty.name,
              type: TypeOfColumn.string},
            { headerName: 'playedTime',
              field: RowProperty.playedTime,
              type: TypeOfColumn.timeCount},
            { headerName: 'score',
              field: RowProperty.scores,
              type: TypeOfColumn.points},
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

        case StatTab.TheMostPopularGames: {

          const columnDef = [
            { headerName: 'game',
              field: RowProperty.game, //wefwefwefwef
              type: TypeOfColumn.string},
            { headerName: 'playedInWeek',
              field: RowProperty.playedInWeek,
              type: TypeOfColumn.timeCount},
            { headerName: 'playedAll',
              field: RowProperty.playedTime,
              type: TypeOfColumn.timeCount},
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

        case StatTab.RecentGames: {

          const columnDef = [
            { headerName: 'game',
              field: RowProperty.game,
              type: TypeOfColumn.string},
            { headerName: 'score',
              field: RowProperty.scores,
              type: TypeOfColumn.points},
            { headerName: 'result',
              field: RowProperty.result,
              type: TypeOfColumn.result},
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
  });
