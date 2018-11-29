import * as d3 from 'd3';

export class Y0AxisRenderer {
  private yAxisGroup!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>
  ): void {
    this.yAxisGroup = container.append('g').classed('ca-BarChart__y0 axis', true);
  }

  public update(
    yAxisGroup: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    arrayOfScores: number[],
    height: number,
    ticksNumber: number
  ): d3.ScaleLinear<number, number> {
    const y0 = d3.scaleLinear().range([height, 0]);
    y0.domain([0, Math.max(...arrayOfScores) * 1.25]);
    const yAxisLeft = d3.axisLeft(y0).ticks(ticksNumber);
    yAxisGroup.call(yAxisLeft);
    return y0;
  }

  public getAxisGroup(): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return this.yAxisGroup;
  }
}
