import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  single = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
        {
          name: '2012',
          value: 9100000,
        },
        {
          name: '2013',
          value: 8000000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
        {
          name: '2012',
          value: 9630000,
        },
        {
          name: '2013',
          value: 10000000,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002,
        },
        {
          name: '2011',
          value: 5800000,
        },
        {
          name: '2012',
          value: 6000000,
        },
        {
          name: '2013',
          value: 7000000,
        },
      ],
    },
  ];
  multi: any[];
  showLegend = true;
  legendPosition = 'below';
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxis = 'Year';
  yAxis = 'Population';
  showGridLines = true;
  colorScheme = {
    domain: ['#47a3eb', '#f39666', '#9482c5', '#ffd300'],
  };
  view: any[] = [700, 400];
}
