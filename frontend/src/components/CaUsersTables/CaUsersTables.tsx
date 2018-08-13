import * as React from 'react';

import { Tab, Tabs, withStyles } from '@material-ui/core';
import { CaTable } from 'components';
import { JsMarathonCharts, MyGameCharts, StatTab, chartCategories, tableCellDataType, chartsTypes,  } from 'models';
import { I18n } from 'react-i18next';

import { ChartTable } from '../ChartTable';

import { CaUsersTablesProps, CaUsersTablesState, HeaderName, StatisticOfUser } from './CaUsersTables.model';
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
        chartCategory: -1,
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
            chartCategory: chartCategories.gameCharts,
            tableItemName: item.game
          });

          break;
        }
        case StatTab.BestUsers: {
          this.setState({
            chartCategory: chartCategories.userCharts
          });

          break;
        }
        default: {
          this.setState({
            chartCategory: -1,
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
                    <ChartTable
                      statistics={this.props.statistic}
                      itemName={this.state.tableItemName}
                      chartList={this.getChartList(this.state.tableItemName)}
                      chartCategory={this.state.chartCategory}
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
            { headerName: 'userName', field: tableCellDataType.name },
            { headerName: 'playedTime', field: tableCellDataType.playedTime },
            { headerName: 'score', field: tableCellDataType.scores }
          ];
          const bestUsers = [...this.props.statistic.bestUsers];

          if (!this.isArrayEmpty(bestUsers)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(bestUsers, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };

              // I'll leave these comments for a while, in case of further changes in the logic of the tabular data

              // const arrayOfProperty = Object.keys(newUserStatistic);

              // arrayOfProperty.forEach(property => {
              //   if (newUserStatistic[property] !== '-') {
              //     if (property === tableCellDataType.name) {
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.playedTime) {
              //       // newUserStatistic[property] = newUserStatistic[property] + ' minutes';
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.scores) {
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }
              //   }
              // });

              return newUserStatistic;
            });

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
            { headerName: 'game', field: tableCellDataType.game },
            { headerName: 'playedInWeek', field: tableCellDataType.playedInWeek },
            { headerName: 'playedAll', field: tableCellDataType.playedTime }
          ];
          const mostPopularGames = [...this.props.statistic.mostPopularGames];

          if (!this.isArrayEmpty(mostPopularGames)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(mostPopularGames, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };

              // I'll leave these comments for a while, in case of further changes in the logic of the tabular data

              // const arrayOfProperty = Object.keys(newUserStatistic);

              // arrayOfProperty.forEach(property => {
              //   if (newUserStatistic[property] !== '-') {

              //     if (property === tableCellDataType.name) {
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.playedInWeek) {
              //       // newUserStatistic[property] = newUserStatistic[property] + ' minutes';
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.playedTime) {
              //       // newUserStatistic[property] = newUserStatistic[property] + ' minutes';
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }
              //   }
              // });

              return newUserStatistic;
            });

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
            { headerName: 'game', field: tableCellDataType.game },
            { headerName: 'score', field: tableCellDataType.scores },
            { headerName: 'result', field: tableCellDataType.result }
          ];
          const recentGames = [...this.props.statistic.recentGames] || [];

          if (!this.isArrayEmpty(recentGames)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(recentGames, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };

              // I'll leave these comments for a while, in case of further changes in the logic of the tabular data

              // const arrayOfProperty = Object.keys(newUserStatistic);

              // arrayOfProperty.forEach(property => {
              //   if (newUserStatistic[property] !== '-') {
              //     if (property === tableCellDataType.game) {
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.scores) {
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }

              //     if (property === tableCellDataType.result) {
              //       // newUserStatistic[property] = newUserStatistic[property] ? 'W' : 'L';
              //       newUserStatistic[property] = newUserStatistic[property];
              //     }
              //   }
              // });

              return newUserStatistic;
            });

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

    public checkPropertyOfObject(arrayOfData: StatisticOfUser[], arrayOfNecessaryProperty: string[]): any[] {

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

    public deleteUnnecessaryProperty(arrayOfData: StatisticOfUser[], arrayOfNecessaryProperty: string[]): any[] {
      const newArrayOfData = arrayOfData.map(userStatistic => {
        const newUserStatistic = { ...userStatistic };

        for (const property in newUserStatistic) {
          if (!(arrayOfNecessaryProperty.indexOf(property) + 1)) {
            delete newUserStatistic[property];
          }
        }
        return newUserStatistic;
      });

      return newArrayOfData;
    }
  });
