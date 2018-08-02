import * as React from 'react';

import { Tab, Tabs, withStyles } from '@material-ui/core';
import { CaTable } from 'components';
import { StatTab } from 'models';
import { I18n } from 'react-i18next';

import { CaUsersTablesProps, CaUsersTablesState, HeaderName, StatisticOfUser } from './CaUsersTables.model';
import { styles } from './CaUsersTables.styles';

import './CaUsersTables.scss';

export const CaUsersTables = withStyles(styles)(
  class extends React.Component<CaUsersTablesProps, CaUsersTablesState> {

    constructor(props: CaUsersTablesProps) {
      super(props);
      this.state = {
        value: 0,
        rowData: [],
        columnDef: []
      };
    }

    public componentWillMount(): void {
      this.changeContent(StatTab.BestUsers);
    }

    public render(): JSX.Element {

      return (
        <I18n>
          {
            ( t ) => (
              <div>
                <h2 className='ca-users-tables__title'>{t('statistics')}</h2>
                <Tabs value={this.state.value}>
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
                    label={t('recentGames')}
                    onClick={() => this.changeContent(StatTab.RecentGames)}
                    classes={{ label: this.props.classes.label }} />
                </Tabs>

                <CaTable rowData={this.state.rowData} columnDef={this.state.columnDef} />
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

    public changeContent(value: number): void {

      switch (value) {
        case StatTab.BestUsers: {

          const columnDef = [
            { headerName: 'User name', field: 'name' },
            { headerName: 'Played time', field: 'playedTime' },
            { headerName: 'Score', field: 'scores' }
          ];
          const bestUsers = [...this.props.statistic.bestUsers];

          if (!this.isArrayEmpty(bestUsers)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(bestUsers, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };
              const arrayOfProperty = Object.keys(newUserStatistic);

              arrayOfProperty.forEach(property => {
                if (newUserStatistic[property] !== '-') {
                  if (property === 'name') {
                    newUserStatistic[property] = newUserStatistic[property];
                  }

                  if (property === 'playedTime') {
                    newUserStatistic[property] = newUserStatistic[property] + ' minutes';
                  }

                  if (property === 'scores') {
                    newUserStatistic[property] = newUserStatistic[property];
                  }
                }
              });

              return newUserStatistic;
            });

            this.setState({
              value,
              rowData,
              columnDef
            });
          } else {
            this.setState({
              value,
              rowData: [],
              columnDef
            });
          }
          break;
        }

        case StatTab.TheMostPopularGames: {

          const columnDef = [
            { headerName: 'Game', field: 'name' },
            { headerName: 'Played in week', field: 'playedInWeek' },
            { headerName: 'Played all', field: 'playedTime' }
          ];
          const mostPopularGames = [...this.props.statistic.mostPopularGames];

          if (!this.isArrayEmpty(mostPopularGames)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(mostPopularGames, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };
              const arrayOfProperty = Object.keys(newUserStatistic);

              arrayOfProperty.forEach(property => {
                if (newUserStatistic[property] !== '-') {

                  if (property === 'name') {
                    newUserStatistic[property] = newUserStatistic[property];
                  }

                  if (property === 'playedInWeek') {
                    newUserStatistic[property] = newUserStatistic[property] + ' minutes';
                  }

                  if (property === 'playedTime') {
                    newUserStatistic[property] = newUserStatistic[property] + ' minutes';
                  }
                }
              });

              return newUserStatistic;
            });

            this.setState({
              value,
              rowData,
              columnDef
            });
          } else {
            this.setState({
              value,
              rowData: [],
              columnDef
            });
          }
          break;
        }

        case StatTab.RecentGames: {

          const columnDef = [
            { headerName: 'Game', field: 'game' },
            { headerName: 'Score', field: 'scores' },
            { headerName: 'Result', field: 'result' }
          ];
          const recentGames = [...this.props.statistic.recentGames];

          if (!this.isArrayEmpty(recentGames)) {
            const arrayOfNecessaryProperty = this.getNecessaryProperty(columnDef);

            const arrayWithoutUnnecessaryProperties = this.deleteUnnecessaryProperty(recentGames, arrayOfNecessaryProperty);
            const arrayWithCheckedProperties = this.checkPropertyOfObject(arrayWithoutUnnecessaryProperties, arrayOfNecessaryProperty);

            const rowData = arrayWithCheckedProperties.map(userStatistic => {
              const newUserStatistic = { ...userStatistic };
              const arrayOfProperty = Object.keys(newUserStatistic);

              arrayOfProperty.forEach(property => {
                if (newUserStatistic[property] !== '-') {
                  if (property === 'game') {
                    newUserStatistic[property] = newUserStatistic[property];
                  }

                  if (property === 'scores') {
                    newUserStatistic[property] = newUserStatistic[property];
                  }

                  if (property === 'result') {
                    newUserStatistic[property] = newUserStatistic[property] ? 'W' : 'L';
                  }
                }
              });

              return newUserStatistic;
            });

            this.setState({
              value,
              rowData,
              columnDef
            });
          } else {
            this.setState({
              value,
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
