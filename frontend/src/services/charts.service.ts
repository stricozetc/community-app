import { ResultStatus, WinRateDiagramData  } from 'models';
import { i18nInstance } from 'utils/i18n';

import { EChartOption } from 'echarts';
/* Remove to models*/
interface GameData {
  game: string;
  result: number
}



export class ChartsService {
  private constructor() {
  }

  public static getWinRateData(gameName: string, gameData: GameData[]): WinRateDiagramData {
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
        data: [i18nInstance.t('win'), i18nInstance.t('lose'), i18nInstance.t('draw')],
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
}
