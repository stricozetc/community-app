import * as React from 'react';

import { CaTable } from 'components/CaTable';
import { CaUsersTablesProps, CaUsersTablesState } from './CaUsersTables.model';
import './CaUsersTables.scss';


import {Tabs, Tab} from '@material-ui/core';

import {StatTab} from 'models';

enum BestUsersHeaderNames {
  name =  'User name',
  playedTime = 'Played time',
  Score = 'Score'
}

enum TheMostPopularGamesHeaderNames {
  name =  'Game',
  playedInWeek = 'Played in week',
  playerAll = 'Played all'
}

enum RecentGamesHeaderNames {
  game =  'Game',
  score = 'Score',
  result = 'Result'
}

export class CaUsersTables extends React.Component<CaUsersTablesProps, CaUsersTablesState> {    

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
      <div>
        <h2 className="ca-users-tables__title">Statistic</h2>
        <Tabs value={this.state.value} className="ca-users-tables__tabs">
          <Tab label="The best users" onClick={() => this.changeContent(StatTab.BestUsers)}  className="ca-users-tables__tab_first-table"/>
          <Tab label="The most popular games" onClick={() => this.changeContent(StatTab.TheMostPopularGames)}  className="ca-users-tables__tab_second-table"/>
          <Tab label="Recent games" onClick={() => this.changeContent(StatTab.RecentGames)}  className="ca-users-tables__tab_third-table"/>
        </Tabs>

        <CaTable rowData={this.state.rowData} columnDef={this.state.columnDef}/>
      </div>
    );
  }

  public getNameOfHeaders(tableHeadersName: any, statistic: object): string[] {
    const propertyNames = Object.keys(statistic);
    const headersName: string[] = [];

    propertyNames.forEach(property => {
      if (tableHeadersName[property]) {
        headersName.push(tableHeadersName[property])
      }
    });
    
    return [...headersName]
  }

  public changeContent(value: number): void {

    switch(value) {
      case StatTab.BestUsers: {
        // const columnDef = ['User name', 'Played time', 'Score'];
        // const propertyNames = Object.keys(this.props.statistic.bestUsers[0]);
        // const headersName: string[] = [];

        // propertyNames.forEach(property => 
        //   headersName.push(BestUsersHeaderNames[property])
        // );

        // const columnDef = [...headersName];

        // const rowData = this.props.statistic.bestUsers.map(userStatistic => {
        //   const newUserStatistic = {...userStatistic};
        //   for (const kindOfStatistic in newUserStatistic) {

        //     if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
        //       if(kindOfStatistic === 'name') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
        //       }

        //       if(kindOfStatistic === 'playedTime') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
        //       }

        //       if(kindOfStatistic === 'Score') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
        //       }
        //     }
            
        //   }
        //   return newUserStatistic
        // })

        const exapmleWithMoreProperty = [{
          name:'Valentin',
          age: '20',
          playedTime: '0',
          Score: 1000
        }];

        const columnDef = this.getNameOfHeaders(BestUsersHeaderNames, exapmleWithMoreProperty[0]);
        
        const rowData = exapmleWithMoreProperty.map(userStatistic => {
          const newUserStatistic = {...userStatistic};
          for (const kindOfStatistic in newUserStatistic) {

            if(BestUsersHeaderNames[kindOfStatistic]) {
              if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
                if(kindOfStatistic === 'name') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
                }
  
                if(kindOfStatistic === 'playedTime') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
                }
  
                if(kindOfStatistic === 'Score') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
                }
              }
            } else {
              console.log('error');
              delete newUserStatistic[kindOfStatistic]
            }
          }
          console.log(newUserStatistic)
          return newUserStatistic
        })

        this.setState({
          value,
          rowData,
          columnDef
        })
        break;
      }

      case StatTab.TheMostPopularGames: {
        // const columnDef = ['Game', 'Played in week', 'Played all'];

        // const propertyNames = Object.keys(this.props.statistic.mostPopularGames[0]);
        // const headersName: string[] = [];

        // propertyNames.forEach(property => 
        //   headersName.push(TheMostPopularGamesHeaderNames[property])
        // );

        // const columnDef = [...headersName];

        // const rowData = this.props.statistic.mostPopularGames.map(userStatistic => {
        //   const newUserStatistic = {...userStatistic};
        //   for (const kindOfStatistic in newUserStatistic) {

        //     if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
        //       if(kindOfStatistic === 'name') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
        //       }

        //       if(kindOfStatistic === 'playedInWeek') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
        //       }

        //       if(kindOfStatistic === 'playerAll') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
        //       }
        //     }
            
        //   }
        //   return newUserStatistic
        // })
        const columnDef = this.getNameOfHeaders(TheMostPopularGamesHeaderNames, this.props.statistic.mostPopularGames[0]);

        const rowData = this.props.statistic.mostPopularGames.map(userStatistic => {
          const newUserStatistic = {...userStatistic};
          for (const kindOfStatistic in newUserStatistic) {

            if(kindOfStatistic === 'name' || 'playedInWeek' || 'playerAll') {
              if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
                if(kindOfStatistic === 'name') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
                }
  
                if(kindOfStatistic === 'playedInWeek') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
                }
  
                if(kindOfStatistic === 'playerAll') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
                }
              }
            } else {
              delete newUserStatistic[kindOfStatistic]
            }            
          }
          return newUserStatistic
        })

        this.setState({
          value,
          rowData,
          columnDef
        })
        break;
      }

      case StatTab.RecentGames: {

        // const columnDef = ['Game', 'Score', 'Result'];
        // const propertyNames = Object.keys(this.props.statistic.recentGames[0]);
        // const headersName: string[] = [];

        // propertyNames.forEach(property => 
        //   headersName.push(RecentGamesHeaderNames[property])
        // );

        // const columnDef = [...headersName];


        // const rowData = this.props.statistic.recentGames.map(userStatistic => {
        //   const newUserStatistic = {...userStatistic};
        //   for (const kindOfStatistic in newUserStatistic) {

        //     if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
        //       if(kindOfStatistic === 'game') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
        //       }

        //       if(kindOfStatistic === 'Score') {
        //         newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
        //       }

        //       if(kindOfStatistic === 'result') {
        //         if(newUserStatistic[kindOfStatistic] === true) {
        //           newUserStatistic[kindOfStatistic] = 'W'
        //         } else {
        //           newUserStatistic[kindOfStatistic] = 'L'
        //         }
        //       }
        //     }
            
        //   }
        //   return newUserStatistic
        // })
        const columnDef = this.getNameOfHeaders(RecentGamesHeaderNames, this.props.statistic.recentGames[0]);

        const rowData = this.props.statistic.recentGames.map(userStatistic => {
          const newUserStatistic = {...userStatistic};
          for (const kindOfStatistic in newUserStatistic) {
            if(kindOfStatistic === 'game' || 'Score' || 'result') {

              if(newUserStatistic.hasOwnProperty(kindOfStatistic)) {
                if(kindOfStatistic === 'game') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic]
                }
  
                if(kindOfStatistic === 'Score') {
                  newUserStatistic[kindOfStatistic] = newUserStatistic[kindOfStatistic] + ' minutes'
                }
  
                if(kindOfStatistic === 'result') {
                  if(newUserStatistic[kindOfStatistic] === true) {
                    newUserStatistic[kindOfStatistic] = 'W'
                  } else {
                    newUserStatistic[kindOfStatistic] = 'L'
                  }
                }
              }
            } else {
              delete newUserStatistic[kindOfStatistic]
            }  
          }
          return newUserStatistic
        })

        this.setState({
          value,
          rowData,
          columnDef
        })
        break;
      }
    }
  }
} 
