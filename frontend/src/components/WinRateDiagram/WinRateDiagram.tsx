import * as echarts from 'echarts';
import * as React from 'react';

import { WinRateDiagramProps } from './WinRateDiagram.model';
import './WinRateDiagram.scss';

export class WinRateDiagram extends React.Component<WinRateDiagramProps> {
  public constructor(props: WinRateDiagramProps) {
    super(props);
  }

  public renderChart(): void {
    const { diagramData } = this.props;

    const myChart = echarts.init(document.querySelector('.win-rate-diagram') as HTMLDivElement);

    myChart.setOption(diagramData.options);
  }

  public componentDidMount(): void {
    this.renderChart();
  }

  public componentDidUpdate(): void {
    this.renderChart();
  }

  public render(): JSX.Element {
    return (
      <div className='win-rate-diagram' />
    );
  }
}
