import * as d3 from 'd3';

export class ColorRenderer {

  private color!: d3.ScaleOrdinal<string, {}>;

  public createScaleForColor(array: string[]): void {
  this.color = d3
    .scaleOrdinal()
    .range(array);
  }

  public getColor(): d3.ScaleOrdinal<string, {}> {
    return this.color;
  }
}
