import * as d3 from 'd3';
import {Margin} from 'models';

export class RectAreaRenderer {

  private rectArea!:  d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
    margin: Margin
  ): void {

    this.rectArea = container
      .append('g')
      .classed('ca-BarChart__rects-group', true)
      .attr(
        'transform',
        'translate(' + margin.left + ',' + margin.top + ')'
      );
  }

  public getRectArea(): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return this.rectArea;
  }

}
