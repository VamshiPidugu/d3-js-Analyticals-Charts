import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-bar-1',
  templateUrl: './d3-bar-1.component.html',
  styleUrls: ['./d3-bar-1.component.css'],
})
export class D3Bar1Component implements OnInit, AfterViewInit {
  // @ViewChild('chart') private chartContainer: ElementRef;

  // private margin = { top: 10, right: 20, bottom: 30, left: 40 };
  // private width: number;
  // private height: number;
  // private x: any;
  // private y: any;
  // private svg: any;
  // private chart: any;
  // private data = [
  //   { name: 'Series 1', value: 20 },
  //   { name: 'Series 2', value: 35 },
  //   { name: 'Series 3', value: 15 },
  //   { name: 'Series 4', value: 10 },
  // ];
  constructor() {}

  // ngOnInit() {
  //   console.log(this.chartContainer);
  //   if (this.chartContainer) {
  //     console.log(this.chartContainer);
  //     this.createChart();
  //     this.updateChart();
  //   }
  // }
  ngAfterViewInit() {
    // if (this.chartContainer) {
    //   console.log(this.chartContainer);
    //   this.createChart();
    //   this.updateChart();
    // }
  }
  // private createChart() {
  //   const element = this.chartContainer.nativeElement;
  //   this.width = 700;
  //   this.height = 400;

  //   this.svg = d3
  //     .select(element)
  //     .append('svg')
  //     .attr('width', this.width)
  //     .attr('height', this.height);

  //   this.chart = this.svg
  //     .append('g')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  //   this.x = d3.scaleBand().range([0, this.width]).padding(0.1);
  //   this.y = d3.scaleLinear().range([this.height, 0]);
  // }

  // private updateChart() {
  //   this.x.domain(this.data.map((d) => d.name));
  //   this.y.domain([0, d3.max(this.data, (d) => d.value)]);

  //   this.chart
  //     .selectAll('.bar')
  //     .data(this.data)
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', (d) => this.x(d.name))
  //     .attr('y', (d) => this.y(d.value))
  //     .attr('height', (d) => this.height - this.y(d.value))
  //     .attr('width', this.x.bandwidth());

  //   this.chart
  //     .append('g')
  //     .attr('class', 'axis axis-x')
  //     .attr('transform', `translate(0, ${this.height})`)
  //     .call(d3.axisBottom(this.x));

  //   this.chart
  //     .append('g')
  //     .attr('class', 'axis axis-y')
  //     .call(d3.axisLeft(this.y));

  //   // rotate x-axis labels
  //   this.chart
  //     .selectAll('.axis-x text')
  //     .attr('transform', `translate(-10,0)rotate(-45)`)
  //     .style('text-anchor', 'end');
  // }

  data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
    { label: 'D', value: 40 },
    { label: 'E', value: 50 },
  ];
  margin = { top: 10, right: 20, bottom: 30, left: 40 };
  width = 700 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  ngOnInit() {
    const svg = d3.select('svg');
    const bars = svg.select('.bars');
    const labels = svg.select('.labels');

    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(this.data.map((d) => d.label))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(this.data, (d) => d.value)]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    const bar = bars
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.value))
      .attr('fill', '#47a3eb');

    bars
      .selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text((d) => d.value)
      .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.value) - 5)
      .attr('text-anchor', 'middle');

    labels
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    labels.append('g').attr('class', 'y-axis').call(yAxis);
  }
}
