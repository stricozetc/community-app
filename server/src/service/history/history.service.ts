import { inject, injectable } from 'inversify';


@injectable()
export class HistoryService {
  public calculatePlayedInWeek(rows: {playedTime: number, createdAt: number}[]): number {
    return rows
    .filter(((el: {playedTime: number, createdAt: number}) => {
      let d = new Date(el.createdAt);
      let millisecondsInWeek = 604800000;

      return Date.now() - d.getTime() < 604800000;
    }))
    .map((row: {playedTime: number, createdAt: number}) => row.playedTime)
    .reduce((a: number, b: number) => a + b);
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
