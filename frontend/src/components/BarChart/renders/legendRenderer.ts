import * as d3 from 'd3';
import { Margin, YAxisFields } from 'models';

export class LegendRenderer {
  private legendText!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  private legendRect!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    color: d3.ScaleOrdinal<string, {}>,
    width: number,
    marginBetweenLegends: number,
    legendRectWidth: number,
    legendRectHeight: number
  ): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    const legend = container
      .selectAll('.legend')
      .data(['Win Rate', 'Average Scores'].slice())
      .enter()
      .append('g')
      .classed('ca-BarChart__legend', true)
      .attr('transform', (d: YAxisFields, i: number) => {
        return 'translate(0,' + i * marginBetweenLegends + ')';
      });

    this.legendRect = legend
      .append('rect')
      .attr('width', legendRectWidth)
      .attr('height', legendRectHeight)
      .style('fill', color);

    this.legendText = legend
      .append('text')
      .attr('x', width)
      .attr('y', legendRectHeight / 2)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .style('font-size', '14px')
      .style('fill', 'white')
      .text((d: string) => {
        return d;
      });

    return container;
  }

  public update(
    width: number,
    margin: Margin,
    legendRectMargins: number,
    legendTextMargins: number
  ): void {
    this.legendRect.attr('x', width + margin.right - legendRectMargins);
    this.legendText.attr('x', width + margin.right - legendTextMargins);
  }
}
