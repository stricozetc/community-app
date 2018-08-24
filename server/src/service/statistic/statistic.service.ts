import { injectable } from 'inversify';
import { isEmpty } from 'validation/is-empty';

@injectable()
export class StatisticService {
  public calculatePlayedInWeek(rows: Array<{playedTime: number, createdAt: number}>): number {
    const playedTimeInWeekArray = rows
    .filter(((el: {playedTime: number, createdAt: number}) => {
      const d = new Date(el.createdAt);
      const millisecondsInWeek = 604800000;

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

  public calculatePlayedTime(array: Array<{playedTime: number}>): number {
    const playedTimeArr = array.map((el) => el.playedTime);
    let playedTime = 0;
    if (!isEmpty(playedTimeArr)) {
      playedTime = playedTimeArr.reduce((a, b) => a + b);
    }

    return playedTime;
  }
}
