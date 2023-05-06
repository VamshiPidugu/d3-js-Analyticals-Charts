import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-d3-v4-line',
  templateUrl: './d3-v4-line.component.html',
  styleUrls: ['./d3-v4-line.component.css'],
})
export class D3V4LineComponent implements OnInit {
  legendItems = [
    { color: '#47a3eb', name: 'Location1' },
    { color: '#f39666', name: 'Location2' },
    { color: '#9482c5', name: 'Location3' },
  ];

  constructor() {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    // Set the dimensions and margins of the chart
    const margin = { top: 120, right: 40, bottom: 50, left: 70 };
    const width = 600 - margin.left - margin.right + 100;
    const height = 400 - margin.top - margin.bottom - 10;

    // Create an SVG element
    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define the data
    const data = [
      { date: '2022-01', value1: 205000, value2: 220000, value3: 310000 },
      { date: '2022-02', value1: 150000, value2: 210000, value3: 370000 },
      { date: '2022-03', value1: 230000, value2: 410000, value3: 620000 },
      { date: '2022-04', value1: 175000, value2: 200000, value3: 550000 },
      { date: '2022-05', value1: 210000, value2: 450000, value3: 620000 },
      { date: '2022-06', value1: 50000, value2: 80000, value3: 400000 },
      { date: '2022-07', value1: 75000, value2: 310000, value3: 590000 },
      { date: '2022-08', value1: 74000, value2: 85000, value3: 400000 },
    ];

    // Format the data to convert the date string into a Date object
    const parseDate = d3.timeParse('%Y-%m');
    data.forEach((d) => {
      d.date = parseDate(d.date);
    });

    // Define the x and y scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.value1, d.value2, d.value3))])
      .range([height, 0]);

    // Define the line generator functions
    const line1 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value1));

    const line2 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value2));

    const line3 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value3));

    // Add the x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .tickPadding(30)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat('%b %Y'))
      );

    // Add the y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).ticks(4).tickSize(-600).tickPadding(10))
      .selectAll('.tick line')
      .attr('stroke-opacity', '0.2')
      .attr('stroke-width', '1.5px');

    svg.select('.x-axis').select('path').remove();
    svg.select('.y-axis').select('path').remove();

    // Add the first line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#47a3eb')
      .attr('stroke-width', 2)
      .attr('d', line1);

    // Add the second line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f39666')
      .attr('stroke-width', 2)
      .attr('d', line2);

    // Add the third line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#9482c5')
      .attr('stroke-width', 2)
      .attr('d', line3);
  }
}
