import * as d3 from 'd3';

export class Y1AxisRenderer {
  private y1AxisGroup!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>
  ): void {
    this.y1AxisGroup = container
      .append('g')
      .classed('ca-BarChart__y1 axis', true);
  }

  public update(
    y1AxisGroup: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    height: number,
    width: number,
    ticksNumber: number
  ): d3.ScaleLinear<number, number> {
    const y1 = d3.scaleLinear().range([height, 0]);

    const yAxisRight = d3
      .axisRight(y1)
      .ticks(5)
      .tickFormat(d => {
        return d + '%';
      });

    y1.domain([0, 100]);

    y1AxisGroup
      .attr('transform', 'translate(' + width + ',0)')
      .call(yAxisRight);

    return y1;
  }

  public getAxisGroup(): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return this.y1AxisGroup;
  }
}
