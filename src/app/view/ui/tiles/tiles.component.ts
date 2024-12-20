import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { TreemapElement } from '../../../utils/models';

@Component({
  selector: 'app-tiles',
  imports: [],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss',
})
export class TilesComponent {
  @Input({ required: true }) data!: TreemapElement;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<SVGElement>;

  ngAfterViewInit(): void {
    this.createChart();
    window.addEventListener('resize', this.createChart.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.createChart.bind(this));
  }

  private createChart(): void {
    this.canvas.nativeElement.innerHTML = '';

    const width = this.canvas.nativeElement.clientWidth;
    const height = this.canvas.nativeElement.clientHeight;

    const tile = (
      node: d3.HierarchyRectangularNode<TreemapElement>,
      x0: number,
      y0: number,
      x1: number,
      y1: number
    ) => {
      d3.treemapBinary(node, 0, 0, width, height);
      node.children?.forEach((child: any) => {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / height) * (y1 - y0);
      });
    };

    const root = d3
      .hierarchy<TreemapElement>(this.data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (a.value || 0) - (b.value || 0));
    d3.treemap<TreemapElement>().tile(tile)(root);

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    const format = d3.format(',d');
    const name = (d: any) =>
      d
        .ancestors()
        .reverse()
        .map((d: any) => d.data.name)
        .join('/');

    const svg = d3
      .select(this.canvas.nativeElement)
      .append('svg')
      .attr('viewBox', [0, -30, width, height])
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'display: block; max-width: 100%; height: auto;')
      .style('font', '10px sans-serif');

    const position = (group: any, root: any) => {
      group
        .selectAll('g')
        .attr(
          'transform',
          (d: any) =>
            `translate(${d === root ? `0,-30` : `${x(d.x0)},${y(d.y0)}`})`
        )
        .select('rect')
        .attr('width', (d: any) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr('height', (d: any) => (d === root ? 30 : y(d.y1) - y(d.y0)));
    };

    const render = (group: any, root: any) => {
      const node = group
        .selectAll('g')
        .data(root.children.concat(root))
        .join('g');
      node
        .filter((d: any) => (d === root ? d.parent : d.children))
        .attr('cursor', 'pointer')
        .on('click', (event: MouseEvent, d: any) =>
          d === root ? zoomout(root) : zoomin(d)
        );

      node
        .append('rect')
        .attr('fill', (d: any) =>
          d === root ? '#2B2B2B' : d.children ? '#1A1A1A' : '#262626'
        )
        .attr('stroke', '#363636');

      let textBlock = node.append('text');
      textBlock
        .append('tspan')
        .text((d: any) =>
          (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g)
        )
        .attr('font-weight', (d: any) => (d === root ? 'bold' : 'normal'))
        .attr('fill', '#ffffff')
        .attr('x', 3)
        .attr('y', 10);
      textBlock
        .append('tspan')
        .text((d: any) => format(d.value))
        .attr('fill', '#ffffff')
        .attr('x', 3)
        .attr('y', 10 + 15);

      group.call(position, root);
    };

    let group = svg.append('g').call(render, root);

    const zoomin = (d: any) => {
      const group0 = group.attr('pointer-events', 'none');
      const group1 = (group = svg.append('g').call(render, d));

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      const t = d3.transition().duration(450);
      group0.transition(t).remove().call(position, d.parent);
      group1
        .transition(t)
        .attrTween('opacity', () => (t) => String(d3.interpolate(0, 1)(t)))
        .call(position, d);
    };

    const zoomout = (d: any) => {
      const group0 = group.attr('pointer-events', 'none');
      const group1 = (group = svg.insert('g', '*').call(render, d.parent));

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      const t = d3.transition().duration(450);
      group0
        .transition(t)
        .remove()
        .attrTween('opacity', () => (t) => String(d3.interpolate(1, 0)(t)))
        .call(position, d);
      group1.transition(t).call(position, d.parent);
    };
  }
}
