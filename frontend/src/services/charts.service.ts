import {
  RecentGames,
  ResultStatus,
  WeekReportData,
  WinRateDiagramData
} from 'models';
import { i18nInstance } from 'utils/i18n';

import { EChartOption } from 'echarts';
import { DaysOfWeek } from 'models';

import { translateNumberOfWeekToItsName } from 'utils/translateNumberOfWeekToItsName';

import { isEmpty } from 'utils/isEmpty';

export class ChartsService {
  private constructor() { }

  public static getWinRateData(
    gameName: string,
    gameData: RecentGames[]
  ): WinRateDiagramData {
    const gameResults = gameData
      .filter(item => item.game === gameName)
      .map(game => game.result);

    let winsNumber = 0;
    let losesNumber = 0;
    let drawNumber = 0;

    gameResults.forEach(result => {
      if (result === ResultStatus.Win) {
        winsNumber++;
      } else if (result === ResultStatus.Lose) {
        losesNumber++;
      } else if (result === ResultStatus.Draw) {
        drawNumber++;
      }
    });

    const options: EChartOption = {
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        textStyle: {
          fontSize: '18'
        }
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [
          i18nInstance.t('win'),
          i18nInstance.t('lose'),
          i18nInstance.t('draw')
        ],
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }
      },
      series: [
        {
          name: gameName,
          type: 'pie',
          color: ['#2FA36C', '#B43C43', '#F4B33A'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              formatter: '{b}: {c} ({d}%)',
              textStyle: {
                fontSize: '24'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: winsNumber,
              name: i18nInstance.t('win')
            },
            {
              value: losesNumber,
              name: i18nInstance.t('lose')
            },
            {
              value: drawNumber,
              name: i18nInstance.t('draw')
            }
          ]
        }
      ]
    };

    const diagramData: WinRateDiagramData = {
      Options: options
    };

    return diagramData;
  }

  public static getWeekReportData(
    gameName: string,
    historyOfUserGames: RecentGames[]
  ): WeekReportData[] {
    const d = new Date();

    const today: number = d.getDay(); // 0 - 6. 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.

    let daysToShowOnScreen: number[] = [];

    const historyForGame = historyOfUserGames.filter(
      item => item.game === gameName
    );

    switch (today) {
      case DaysOfWeek.SUNDAY: {
        daysToShowOnScreen = [DaysOfWeek.SUNDAY];
        break;
      }
      case DaysOfWeek.MONDAY: {
        daysToShowOnScreen = [DaysOfWeek.SUNDAY, DaysOfWeek.MONDAY];
        break;
      }

      case DaysOfWeek.TUESDAY: {
        daysToShowOnScreen = [
          DaysOfWeek.SUNDAY,
          DaysOfWeek.MONDAY,
          DaysOfWeek.TUESDAY
        ];
        break;
      }

      case DaysOfWeek.WEDNESDAY:
        {
          daysToShowOnScreen = [
            DaysOfWeek.SUNDAY,
            DaysOfWeek.MONDAY,
            DaysOfWeek.TUESDAY,
            DaysOfWeek.WEDNESDAY
          ];
        }
        break;

      case DaysOfWeek.THURSDAY: {
        daysToShowOnScreen = [
          DaysOfWeek.SUNDAY,
          DaysOfWeek.MONDAY,
          DaysOfWeek.TUESDAY,
          DaysOfWeek.WEDNESDAY,
          DaysOfWeek.THURSDAY
        ];
        break;
      }

      case DaysOfWeek.FRIDAY: {
        daysToShowOnScreen = [
          DaysOfWeek.SUNDAY,
          DaysOfWeek.MONDAY,
          DaysOfWeek.TUESDAY,
          DaysOfWeek.WEDNESDAY,
          DaysOfWeek.THURSDAY,
          DaysOfWeek.FRIDAY
        ];
        break;
      }

      case DaysOfWeek.SATURDAY: {
        daysToShowOnScreen = [
          DaysOfWeek.SUNDAY,
          DaysOfWeek.MONDAY,
          DaysOfWeek.TUESDAY,
          DaysOfWeek.WEDNESDAY,
          DaysOfWeek.THURSDAY,
          DaysOfWeek.FRIDAY,
          DaysOfWeek.SATURDAY
        ];
        break;
      }

      default: {
        throw new Error('Days of week is incorrect');
      }
    }

    const weekReportData: WeekReportData[] = daysToShowOnScreen.map(
      (day: number) => {
        const historyForDay = historyForGame.filter(item => {
          const playedAtTime = new Date(item.playedAt);

          const thatTime = {
            day: playedAtTime.getDay(),
            date: playedAtTime.getDate()
          };

          return thatTime.day === day && Math.abs(d.getDate() - thatTime.date) <= 6; // if this is that day of week and current week
        });

        const results = historyForDay.map(h => h.result);

        let winsNumber = 0;
        let losesNumber = 0;
        let drawNumber = 0;

        results.forEach(result => {
          if (result === ResultStatus.Win) {
            winsNumber++;
          } else if (result === ResultStatus.Lose) {
            losesNumber++;
          } else if (result === ResultStatus.Draw) {
            drawNumber++;
          }
        });

        const numberOfBattles = winsNumber + losesNumber + drawNumber;
        const winRate = (winsNumber / numberOfBattles) * 100 || 0;
        let averageScores = 0;

        if (!isEmpty(historyForDay)) {
          const scoresSum = historyForDay.reduce((a, b) => a + b.scores, 0);
          averageScores = scoresSum / numberOfBattles;
        }
        const dayOfWeek = translateNumberOfWeekToItsName(day);

        return {
          dayOfWeek,
          values: [
            {
              name: 'winRate',
              value: winRate
            },
            {
              name: 'averageScores',
              value: averageScores
            }
          ]
        };
      }
    );

    return weekReportData;
  }
}
