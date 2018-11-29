import { ConvertedWeekReportData, WeekReportData } from 'models';

export const transformData = (inputData: WeekReportData[]): {
  data: ConvertedWeekReportData[],
  arrayOfScores: number[],
  shortWeekdays: string[]
}  => {

  const shortWeekdays = ['Sat', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];

  const data: ConvertedWeekReportData[] = inputData.map(
    (d: ConvertedWeekReportData) => {
      d.dayOfWeek = d.dayOfWeek.substring(0, 3);
      return d;
    }
  );

  const arrayOfScores = data.reduce(
    (acc: number[], cur: ConvertedWeekReportData) => {
      return acc.concat(cur.values[1].value);
    },
    []
  );

  const outputData = {
    data,
    arrayOfScores,
    shortWeekdays
  };

  return outputData;

};
