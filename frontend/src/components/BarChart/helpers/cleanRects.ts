import * as d3 from 'd3';

export const cleanOldRectsFor = (
  selector: string,
) => {
  d3.selectAll(selector).remove();
};
