import './CaChart.scss';
import * as React from 'react';

import {CaChartProps} from './CaChart.model';

import ReactEcharts from 'echarts-for-react';

export const CaChart = (props: CaChartProps) => {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} ({d}%)"
        },
        color: ['#35BD9A','#DF766F'],
        animation: false,
        series: [
            {
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: '{d}%',
                        fontSize: 40,
                        backgroundColor: '#1C2227'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '40'
                        },
                        itemStyle: {
                            color: ['green', 'red']
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                },
                data:[
                    {value:25, name:'Win'},
                    {value:75, name:'Lose'},
                ]
            }
        ]
    };

    return(
        <div>
            <ReactEcharts option={option}/>
        </div>
    )
}
