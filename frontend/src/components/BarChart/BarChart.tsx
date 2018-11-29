import * as d3 from 'd3';
import * as React from 'react';

import { BarChartConfig, BarChartProps } from './BarChart.model';
import './BarChart.scss';

import {
  ColorRenderer,
  GraphAreaRenderer,
  LegendRenderer,
  RectAreaRenderer,
  RectRenderer,
  SvgRenderer,
  TipRenderer,
  XAxisRenderer,
  Y0AxisRenderer,
  Y1AxisRenderer
} from './renders';

import { cleanOldRectsFor, transformData } from './helpers';

export class BarChart extends React.Component<BarChartProps> {
  public chartArea: React.RefObject<any>;

  public xAxisRenderer: XAxisRenderer;
  public y0AxisRenderer: Y0AxisRenderer;
  public y1AxisRenderer: Y1AxisRenderer;
  public rectRenderer: RectRenderer;
  public tipRenderer: TipRenderer;
  public legendRenderer: LegendRenderer;
  public svgRenderer: SvgRenderer;
  public graphAreaRenderer: GraphAreaRenderer;
  public rectAreaRenderer: RectAreaRenderer;
  public colorRenderer: ColorRenderer;
  public margin: { top: number; right: number; left: number; bottom: number };
  public config: BarChartConfig;

  public constructor(props: BarChartProps) {
    super(props);

    this.config = this.props.config;
    this.margin = this.config.margin;
    this.chartArea = React.createRef();
    this.xAxisRenderer = new XAxisRenderer();
    this.y0AxisRenderer = new Y0AxisRenderer();
    this.y1AxisRenderer = new Y1AxisRenderer();
    this.rectRenderer = new RectRenderer();
    this.tipRenderer = new TipRenderer();
    this.legendRenderer = new LegendRenderer();
    this.svgRenderer = new SvgRenderer();
    this.graphAreaRenderer = new GraphAreaRenderer();
    this.rectAreaRenderer = new RectAreaRenderer();
    this.colorRenderer = new ColorRenderer();
  }

  public renderChart(height: number, width: number): void {
    this.colorRenderer.createScaleForColor([
      'rgba(66, 244, 176, .9)',
      'rgba(252, 196, 55, .9)'
    ]);
    const color = this.colorRenderer.getColor();

    const container = d3.select('.ca-BarChart__chart-area');
    this.svgRenderer.appendTo(container);
    this.svgRenderer.setHeight(height);
    this.svgRenderer.setWidth(width);
    const svg = this.svgRenderer.getSvgElement();
    this.graphAreaRenderer.appendTo(svg, this.margin);
    const graphArea = this.graphAreaRenderer.getGraphAreaElement();
    this.tipRenderer.appendTo(graphArea);
    this.xAxisRenderer.appendTo(graphArea);
    this.y0AxisRenderer.appendTo(graphArea);
    this.y1AxisRenderer.appendTo(graphArea);
    this.legendRenderer.appendTo(
      svg,
      color,
      width,
      this.config.marginBetweenLegends,
      this.config.legendRectWidth,
      this.config.legendRectHeight
    );

    this.updateGraph(height, width);
  }

  public updateGraph(height: number, width: number): void {
    const { data, shortWeekdays, arrayOfScores } = transformData(
      this.props.diagramData
    );
    cleanOldRectsFor('svg g.ca-BarChart__rects-group');

    this.svgRenderer.setHeight(height);
    this.svgRenderer.setWidth(width);
    const svg = this.svgRenderer.getSvgElement();

    width = width - this.margin.left - this.margin.right;
    height = height - this.margin.top - this.margin.bottom;

    this.rectAreaRenderer.appendTo(svg, this.margin);
    const graphArea = this.rectAreaRenderer.getRectArea();
    const res = this.xAxisRenderer.update(
      graphArea,
      height,
      width,
      shortWeekdays,
      data
    );
    const scaleX1 = res.scaleX1;
    const graph = res.updatedGraph;

    const yAxisGroup = this.y0AxisRenderer.getAxisGroup();

    const scaleY0 = this.y0AxisRenderer.update(
      yAxisGroup,
      arrayOfScores,
      height,
      this.config.ticksNumber
    );
    const y1AxisGroup = this.y1AxisRenderer.getAxisGroup();
    const scaleY1 = this.y1AxisRenderer.update(
      y1AxisGroup,
      height,
      width,
      this.config.ticksNumber
    );
    const tip = this.tipRenderer.getTip();
    const color = this.colorRenderer.getColor();
    this.rectRenderer.draw(
      graph,
      tip,
      scaleX1,
      color,
      scaleY0,
      scaleY1,
      height,
      this.props.config.animationDuration
    );
    this.legendRenderer.update(
      width,
      this.margin,
      this.config.legendRectMargins,
      this.config.legendTextMargins
    );
  }

  public componentDidMount(): void {
    let dimensions = this.getHeightAndWidthOfContainer();
    let height = dimensions.height;
    let width = dimensions.width;

    this.renderChart(height, width);

    let prevHeight = height;
    let prevWidth = width;

    window.addEventListener('resize', () => {
      dimensions = this.getHeightAndWidthOfContainer();
      height = dimensions.height;
      width = dimensions.width;

      if (optimizeResize(height, width)) {
        this.updateGraph(height, width);
        prevHeight = height;
        prevWidth = width;
      }
    });

    const optimizeResize = (
      currentHeight: number,
      currentWidth: number
    ): boolean =>
      Math.abs(prevHeight - currentHeight) > 5 ||
      Math.abs(prevWidth - currentWidth) > 5;
  }

  public componentDidUpdate(prevProps: BarChartProps): void {
    const dimensions = this.getHeightAndWidthOfContainer();
    const height = dimensions.height;
    const width = dimensions.width;

    if (prevProps.diagramData !== this.props.diagramData) {
      this.updateGraph(height, width);
    }
  }

  public render(): JSX.Element {
    return (
      <div className='ca-BarChart'>
        <div className='ca-BarChart__chart-area' ref={this.chartArea} />
      </div>
    );
  }

  private getHeightAndWidthOfContainer(): { height: number; width: number } {
    let height = this.chartArea.current
      ? this.chartArea.current.offsetHeight
      : 100;
    let width = this.chartArea.current
      ? this.chartArea.current.offsetWidth
      : 100;
    if (height > 400) {
      height = 400;
    }
    if (width > 600) {
      width = 600;
    }

    return { height, width };
  }
}
