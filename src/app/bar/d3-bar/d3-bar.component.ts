import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-bar',
  templateUrl: './d3-bar.component.html',
  styleUrls: ['./d3-bar.component.css'],
})
export class D3BarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.createBars();
  }
  createBars() {
    const data = [
      { name: 'Apples', value: 20 },
      { name: 'Bananas', value: 12 },
      { name: 'Cherries', value: 8 },
      { name: 'Dates', value: 15 },
      { name: 'Elderberries', value: 25 },
      { name: 'Appples', value: 20 },
      { name: 'Banaonas', value: 12 },
      { name: 'Cherjries', value: 8 },
      { name: 'Datjes', value: 15 },
      { name: 'Eldehrberries', value: 20 },
      { name: 'Elderberries1', value: 25 },
      { name: 'Appples1', value: 20 },
      { name: 'Banaonas1', value: 12 },
      { name: 'Cherjries1', value: 8 },
      { name: 'Datjes1', value: 15 },
      { name: 'Eldehrberries1', value: 20 },
      { name: 'Elderberries2', value: 25 },
      { name: 'Appples2', value: 20 },
      { name: 'Banaonas2', value: 12 },
      { name: 'Cherjries2', value: 8 },
      { name: 'Datjes2', value: 15 },
      { name: 'Eldehrberries2', value: 20 },
      { name: 'Appples3', value: 25 },
      { name: 'Banaonas3', value: 12 },
      { name: 'Cherjries3', value: 8 },
      { name: 'Datjes3', value: 15 },
      { name: 'Eldehrberries3', value: 20 },
    ];

    const margin = { top: 20, right: 150, bottom: 70, left: 70 };
    // const margin = { top: 20, right: 20, bottom: 20, left: 60 };
    const width = 650 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // const margin = { top: 20, right: 20, bottom: 50, left: 70 };
    // const width = 700 - margin.left - margin.right;
    // const height = 500 - margin.top - margin.bottom;
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const svg = d3
      .select('svg')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const bars = svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', '#47a3eb')
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.value))
      .on('mouseover', function (d) {
        d3.select(this).attr('fill', '#47a3eb');
        // tooltip.html(`<strong>${d.name}:</strong> ${d.value}`)
        //   .style('opacity', 1)
        //   .style('left', `${d3.event.pageX}px`)
        //   .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#47a3eb');
        tooltip.style('opacity', 0);
      })
      .append('title')
      .text(function (d: any) {
        return d.name + ' - ' + d.value;
      });
    const valueLabels = svg
      .selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5)
      .text((d) => d.value);

    // bars
    // .selectAll('text')
    // .data(data)
    // .enter()
    // .append('text')
    // .text((d) =>console.log(d.value))
    // .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 2)
    // .attr('y', (d) => yScale(d.value) - 5)
    // .attr('text-anchor', 'middle');
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).tickSize(0);

    // svg
    //   .append('g')
    //   .attr('class', 'x-axis')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(xAxis).
    //   attr('transform', 'rotate(-45)')
    //   .attr('text-anchor', 'end')
    //   .attr('dx', '-0.8em')
    //   .attr('dy', '0.15em');;

    // svg
    //   .append('defs')
    //   .append('marker')
    //   .attr('id', 'arrow')
    //   .attr('markerWidth', 10)
    //   .attr('markerHeight', 10)
    //   .attr('refX', 0)
    //   .attr('refY', 3)
    //   .attr('orient', 'auto')
    //   .append('path')
    //   .attr('d', 'M0,0 L0,6 L9,3 z');

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.15em');

    svg.append('g').attr('class', 'y-axis').call(yAxis);
    svg.select('.x-axis').select('path').remove();
    svg.select('.y-axis').select('path').remove();

    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 50)
      .text('X Axis Label');

    svg
      .append('text')
      .attr('class', 'y-label')
      .attr('text-anchor', 'middle')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('transform', 'rotate(-90)')
      .text('Y Axis Label');
  }
}
