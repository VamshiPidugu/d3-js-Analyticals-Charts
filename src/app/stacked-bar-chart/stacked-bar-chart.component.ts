import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css'],
})
export class StackedBarChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.createChart();
    this.createChart1();
    // this.create();
  }
  create() {
    // create data
    const data = [
      { category: 'A', value1: 10, value2: 20, value3: 30, value4: 40 },
      { category: 'B', value1: 20, value2: 30, value3: 40, value4: 10 },
      { category: 'C', value1: 30, value2: 40, value3: 10, value4: 20 },
      { category: 'D', value1: 40, value2: 10, value3: 20, value4: 30 },
      { category: 'E', value1: 15, value2: 25, value3: 35, value4: 45 },
    ];

    // set dimensions and margins
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // create svg container
    const svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // set x and y scales
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.category))
      .paddingInner(0.1)
      .paddingOuter(0.5);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(data, (d) => d.value1 + d.value2 + d.value3 + d.value4),
      ]);

    // create x and y axes and add gridlines
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickSize(-width).tickFormat('');

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g').attr('class', 'y-axis').call(yAxis);

    svg
      .selectAll('.y-axis .tick line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '2px 2px');
  }
  createChart() {
    const data = [
      { group: 'Group 1', value1: 10, value2: 20, value3: 30, value4: 40 },
      { group: 'Group 2', value1: 20, value2: 30, value3: 40, value4: 50 },
      { group: 'Group 3', value1: 30, value2: 40, value3: 50, value4: 60 },
      { group: 'Group 4', value1: 40, value2: 50, value3: 60, value4: 70 },
    ];

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = 590 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x0Scale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.group))
      .paddingInner(0.1);

    const x1Scale = d3
      .scaleBand()
      .range([0, x0Scale.bandwidth()])
      .domain([1, 2, 3, 4])
      .padding(0.05);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(data, (d) => d3.sum([d.value1, d.value2, d.value3, d.value4])),
      ])
      .nice();

    const color = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4])
      .range(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3']);

    const svg = d3
      .select('svg')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x0Scale));

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => `${d}`)
          .tickSize(-width)
          .tickPadding(10)
      )
      .selectAll('.tick line')
      .attr('stroke', '#ccc');

    const groups = svg
      .selectAll('.group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', (d) => `translate(${x0Scale(d.group)}, 0)`);

    groups
      .selectAll('rect')
      .data((d) => [d.value1, d.value2, d.value3, d.value4])
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x1Scale(i + 1))
      .attr('y', (d) => yScale(d3.sum([d])))
      .attr('width', x1Scale.bandwidth())
      .attr('height', (d) => height - yScale(d3.sum([d])))
      .attr('fill', (d, i) => color(i + 1));
  }
  createChart1() {
    const data = [
      { category: 'A', value1: 20, value2: 10, value3: 50, value4: 15 },
      { category: 'B', value1: 30, value2: 5, value3: 10, value4: 20 },
      { category: 'C', value1: 25, value2: 15, value3: 8, value4: 12 },
      { category: 'D', value1: 10, value2: 20, value3: 120, value4: 18 },
      { category: 'E', value1: 15, value2: 25, value3: 5, value4: 10 },
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const categories = data.map((d) => d.category);
    const values = ['value1', 'value2', 'value3', 'value4'];

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(categories)
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d3.sum(values, (v) => d[v]))]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(values)
      .range(['#47a3eb', '#f39666', '#9482c5', '#ffd300']);

    const stackedData = d3.stack().keys(values)(data);

    const bars = svg
      .append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => colorScale(d.key))
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.data.category))
      .attr('y', (d) => yScale(d[1]))
      .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth());

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g').attr('transform', `translate(0,${height})`).call(xAxis);

    svg.append('g').call(yAxis);
  }
}
