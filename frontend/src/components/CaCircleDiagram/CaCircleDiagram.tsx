import * as React from 'react';

import * as echarts from 'echarts'

import { CaCircleDiagramProps } from './CaCircleDiagram.model';
import { canvasStyles } from './CaCircleDiagram.styles';
import './CaCircleDiagram.scss';

require('echarts/lib/component/tooltip');

export class CaCircleDiagram extends React.Component<CaCircleDiagramProps> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    constructor(props: CaCircleDiagramProps) {
        super(props);
        this.canvasRef = React.createRef()
    }

    public render(): JSX.Element {
        return (
            <div className='ca-circle-diagram__wrapper'>
                <canvas width={canvasStyles.width} height={canvasStyles.height}
                    ref={this.canvasRef}></canvas>
            </div>
        );
    }

    public componentDidUpdate() {
        if (this.canvasRef) {
            this.renderChart();
        }
    }

    public renderChart() {
        let myChart = echarts.init(document.querySelector("canvas")!);
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
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
                        { value: 25, name: '25%' },
                        { value: 75, name: '75%' },
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}