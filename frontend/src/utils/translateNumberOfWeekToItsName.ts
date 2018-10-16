import { DaysOfWeek } from 'models';

export const translateNumberOfWeekToItsName = (d: number): string => {
  switch (d) {
      case DaysOfWeek.SATURDAY:
        return 'Saturday';
      case DaysOfWeek.MONDAY:
        return 'Monday';
      case DaysOfWeek.TUESDAY:
        return 'Tuesday';
      case DaysOfWeek.WEDNESDAY:
        return 'Wednesday';
      case DaysOfWeek.THURSDAY:
        return 'Thursday';
      case DaysOfWeek.FRIDAY:
        return 'Friday';
      case DaysOfWeek.SUNDAY:
        return 'Sunday';

      default:
        return 'Saturday';
    }
};
