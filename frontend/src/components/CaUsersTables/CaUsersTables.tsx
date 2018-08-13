import * as React from 'react';

import { Tab, Tabs, withStyles } from '@material-ui/core';
import { CaTable } from 'components';
import { HeaderName, Row, RowProperty, StatTab, TypeOfColumn } from 'models';
import { I18n } from 'react-i18next';

import { CaUsersTablesProps, CaUsersTablesState } from './CaUsersTables.model';
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
                    label={t('recentGamesLabel')}
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
            { headerName: 'game',
              field: RowProperty.name,
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
