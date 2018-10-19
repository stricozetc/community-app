import * as d3 from 'd3';
import { YAxisFields } from 'models';

const d3Tip = require('d3-tip');

export class TipRenderer {

  private tip!: { show(): void; hide(): void };

  public appendTo(
    container: d3.Selection<d3.BaseType, {}, HTMLElement, any>
  ): void {
    const tip = d3Tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d: YAxisFields) => {
      let text = `<span class="d3-tip__key"> ${d.name}  </span> `;
      text += `<span class="d3-tip__value"> ${d.value}  </span><br>`;
      return text;
    });
    container.call(tip);
    this.tip = tip;
  }

  public getTip(): { show(): void; hide(): void; } {
    return this.tip;
  }

}
