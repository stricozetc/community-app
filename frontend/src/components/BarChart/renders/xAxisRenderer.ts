import * as d3 from 'd3';

import { ConvertedWeekReportData } from 'models';

import { XRendererOutput } from './interfaces';
import { averageScores, winRate } from '../constants';

export class XAxisRenderer {

  private xAxisGroup!:  d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>
  ): d3.Selection<d3.BaseType, {}, HTMLElement, any> {

    this.xAxisGroup = container.append('g').classed('ca-BarChart__x axis', true);

    return this.xAxisGroup;
  }

  public update(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    height: number,
    width: number,
    arrForDomain: string[],
    data: ConvertedWeekReportData[]
  ): XRendererOutput {
    const scaleX1 = d3
      .scaleBand()
      .paddingOuter(0.9)
      .paddingInner(0.1);

    const graph = container
      .selectAll('.date')
      .data(data)
      .enter()
      .append('g')
      .classed('ca-BarChart__Rects-container', true);

    const scaleX0 = d3.scaleBand().range([0, width]);

    const xAxis = d3.axisBottom(scaleX0);

    scaleX0.domain(
      arrForDomain.map(d => {
        return d;
      })
    );

    scaleX1.domain([winRate, averageScores]).range([0, scaleX0.step()]);

    this.xAxisGroup.attr('transform', 'translate(0,' + height + ')').call(xAxis);

    graph.attr('transform', (d: ConvertedWeekReportData) => {
      return 'translate(' + scaleX0(d.dayOfWeek) + ',0)';
    });

    return {
      scaleX1,
      updatedGraph: graph
    };
  }
}
