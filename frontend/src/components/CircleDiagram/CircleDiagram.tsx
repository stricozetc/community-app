import { init } from 'echarts';
import * as React from 'react';

import { CircleDiagramProps } from './CircleDiagram.model';
import './CircleDiagram.scss';

export class CircleDiagram extends React.Component<CircleDiagramProps> {
  public constructor(props: CircleDiagramProps) {
    super(props);
  }

  public renderChart(): void {
    const { diagramData } = this.props;

    const myChart = init(document.querySelector('.win-rate-diagram') as HTMLDivElement);

    myChart.setOption(diagramData.Options);
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
