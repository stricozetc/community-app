import * as d3 from 'd3';
import { ConvertedWeekReportData, YAxisFields } from 'models';
import { winRate } from '../constants';

export class RectRenderer {
  public draw(
    graph: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    tip: { show(): void; hide(): void },
    x1: d3.ScaleBand<string>,
    color: d3.ScaleOrdinal<string, {}>,
    y0: d3.ScaleLinear<number, number>,
    y1: d3.ScaleLinear<number, number>,
    height: number,
    animationDuration: number
  ): void {

    const rects = graph.selectAll('rect').data((d: ConvertedWeekReportData) => {
      return d.values;
    });

    rects
      .exit()
      .remove();

    rects
      .enter()
      .append('rect')
      .attr('width', x1.bandwidth())
      .attr('x', (d: YAxisFields) => x1(d.name))
      .attr('y', (d: number) => {
        return height;
      })
      .attr('height', 0)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .style('fill', (d: YAxisFields) => {
        return color(d.name);
      })
      .style('opacity', 0.7)
      .transition()
      .duration(200)
      .delay((d: YAxisFields, i: number) => i * animationDuration)
      .attr('y', (d: YAxisFields) => {
        if (d.name === winRate) {
          return y1(d.value);
        } else {
          return y0(d.value);
        }
      })
      .attr('height', (d: YAxisFields) => {
        if (d.name === winRate) {
          return height - y1(d.value);
        } else {
          return height - y0(d.value);
        }
      });

  }
}
