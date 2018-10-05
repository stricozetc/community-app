import * as d3 from 'd3';

export interface XRendererOutput {
  scaleX1: d3.ScaleBand<string>;
  updatedGraph: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
}
