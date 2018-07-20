import { inject, injectable } from 'inversify';
import { isEmpty } from '../../validation/is-empty';



@injectable()
export class StatisticService {
  public calculatePlayedInWeek(rows: {playedTime: number, createdAt: number}[]): number {
    let playedTimeInWeekArray = rows
    .filter(((el: {playedTime: number, createdAt: number}) => {
      let d = new Date(el.createdAt);
      let millisecondsInWeek = 604800000;

      return Date.now() - d.getTime() < 604800000;
    }))
    .map((row: {playedTime: number, createdAt: number}) => row.playedTime);

    if (!isEmpty(playedTimeInWeekArray)) {
      return playedTimeInWeekArray.reduce((a: number, b: number) => a + b);
    } else {
      return 0;
    }
    
  }

  public sortBy(array: any[], property: string): any[] {
    return array.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return 1;
      }
      if (a[property] > b[property]) {
        return -1;
      }

      return 0;
    });
  }
}
