import * as d3 from 'd3';
import { Margin } from 'models';

export class GraphAreaRenderer {

  private graphArea!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    margin: Margin
  ): void {

    this.graphArea = container
      .append('g')
      .attr(
        'transform',
        'translate(' + margin.left + ',' + margin.top + ')'
      );
  }

  public getGraphAreaElement(): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return this.graphArea;
  }
}
