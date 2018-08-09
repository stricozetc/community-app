import * as echarts from 'echarts';
import * as React from 'react';
import { i18nInstance } from 'utils/i18n';

import { WinRateDiagramProps } from './WinRateDiagram.model';
import './WinRateDiagram.scss';
import { WinRateDiagramService } from './WinRateDiagram.service';

export class WinRateDiagram extends React.Component<WinRateDiagramProps> {
  public constructor(props: WinRateDiagramProps) {
    super(props);
  }

  public renderChart(): void {
    const diagramData = WinRateDiagramService.getGamesResults('JsMarathon', this.props.gameData);

    const myChart = echarts.init(document.querySelector('.win-rate-diagram__container') as HTMLDivElement);

    const option = {
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [i18nInstance.t('win'), i18nInstance.t('lose')],
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: 'JsMarathon',
          type: 'pie',
          color: ['#2FA36C', '#B43C43'],
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
                fontSize: '20'
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
              value: diagramData.winsNumber,
              name: i18nInstance.t('win')
            },
            {
              value: diagramData.losesNumber,
              name: i18nInstance.t('lose')
            },
          ]
        }
      ]
    };
    myChart.setOption(option);
  }

  public componentDidMount(): void {
    this.renderChart();
  }

  public componentDidUpdate(): void {
    this.renderChart();
  }

  public render(): JSX.Element {
    return (
      <div className='win-rate-diagram'>
        <div className='win-rate-diagram__container'/>
      </div>
    );
  }
}
