import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-donut',
  templateUrl: './d3-donut.component.html',
  styleUrls: ['./d3-donut.component.css'],
})
export class D3DonutComponent implements OnInit {
  private data = [
    {
      name: 'Material',
      value: 8940000,
    },
    {
      name: 'Transport',
      value: 5000000,
    },
    {
      name: 'Packaging',
      value: 7200000,
    },
    {
      name: 'Process',
      value: 6200000,
    },
  ];

  private svg;
  private margin = 50;
  private width = 400;
  private height = 400;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.el.nativeElement)
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private drawChart(): void {
    const radius = Math.min(this.width, this.height) / 2 - this.margin;
    const color = d3
      .scaleOrdinal()
      
      .domain(this.data.map((d) => d.name))
      .range(['#47a3eb', '#f39666', '#ffd300', '#9482c5']);

    const pie = d3
      .pie()
      .value((d: any) => d.value)
      .sort(null);

    const data_ready = pie(this.data);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const tooltip = d3
      .select('#chart')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('position', 'absolute')
      .style('pointer-events', 'none');

    this.svg
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.name))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 1)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(300)
          .style('opacity', 1)
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius * 0.5)
              .outerRadius(radius * 0.9)
          );
        // tooltip
        //   .style('opacity', 1)
        //   .html(`<strong>${d.data.name}:</strong> ${d.data.value}`)
        //   // .style('left', `${d3.event.pageX}px`)
        //   // .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(300)
          .style('opacity', 0.7)
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius * 0.5)
              .outerRadius(radius * 0.8)
          );
        tooltip.style('opacity', 0);
      })
      .append('title')
      .text(function (d: any) {
        return d.data.name + ':' + d.data.value;
      });
  }
}
