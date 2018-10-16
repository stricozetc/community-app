import * as d3 from 'd3';

export class SvgRenderer {

  private svg!: d3.Selection<d3.BaseType, {}, HTMLElement, any>;

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>,
  ): void {
    this.svg = container.append('svg');
  }

  public setWidth(width: number): void {
    this.svg.attr('width', width);
  }

  public setHeight(height: number): void {
    this.svg.attr('height', height);
  }

  public getSvgElement(): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return this.svg;
  }
}
