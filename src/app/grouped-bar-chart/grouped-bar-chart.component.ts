import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css'],
})
export class GroupedBarChartComponent implements OnInit {
  data = [
    { group: 'A', bar1: 60, bar2: 30 },
    { group: 'B', bar1: 55, bar2: 10 },
    { group: 'C', bar1: 30, bar2: 40 },
    { group: 'D', bar1: 40, bar2: 50 },
    { group: 'E', bar1: 50, bar2: 60 },
  ];
  constructor() {}

  ngOnInit() {
    this.createChart();
    this.createChart1();
  }

  createChart1() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create the x-axis
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.bar1 + d.bar2)])
      .range([0, width]);

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Create the y-axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(this.data.map((d) => d.group))
      .padding(0.2);

    svg.append('g').attr('class', 'axis').call(d3.axisLeft(y));

    // Create the first set of bars
    svg
      .selectAll('.bar1')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar1')
      .attr('x', (d) => 0)
      .attr('y', (d) => y(d.group))
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.bar1))
      .attr('fill', '#47a3eb');

    // Create the second set of bars
    svg
      .selectAll('.bar2')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar2')
      .attr('x', (d) => x(d.bar1))
      .attr('y', (d) => y(d.group))
      .attr('height', y.bandwidth())
      .attr('width', (d) => x(d.bar2))
      .attr('fill', '#f39666');
  }
  createChart() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Set the scales
    const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

    const x1 = d3.scaleBand().padding(0.05);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    x0.domain(this.data.map((d) => d.group));
    x1.domain(['bar1', 'bar2']).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(this.data, (d) => d.bar2)]).nice();

    // Create the SVG element
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    //  .attr('transform', `rotate(60)`);

    // Create the x-axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    //     // Create the y-axis
    // svg.append('g')
    // .attr('class', 'axis')
    // .call(d3.axisLeft(y).ticks(null, 's'))
    // .append('text')
    // .attr('x', 2)
    // .attr('y', y(y.ticks().pop()) + 0.5)
    // .attr('dy', '0.32em')
    // .attr('fill', '#000')
    // .attr('font-weight', 'bold')
    // .attr('text-anchor', 'start')
    // .text('Value');

    // Create the bars
    svg
      .append('g')
      .selectAll('g')
      .data(this.data)
      .join('g')
      .attr('transform', (d) => `translate(${x0(d.group)},0)`)
      .selectAll('rect')
      .data((d) => [
        { key: 'bar1', value: d.bar1 },
        { key: 'bar2', value: d.bar2 },
      ])
      .join('rect')
      .attr('x', (d) => x1(d.key))
      .attr('y', (d) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => (d.key === 'bar1' ? '#47a3eb' : '#f39666'));
  }
}
