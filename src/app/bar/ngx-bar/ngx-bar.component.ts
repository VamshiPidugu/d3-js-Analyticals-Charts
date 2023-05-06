import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-ngx-bar',
  templateUrl: './ngx-bar.component.html',
  styleUrls: ['./ngx-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxBarComponent implements OnInit {
  data = [
    { name: 'Apples', value: 20 },
    { name: 'Bananas', value: 12 },
    { name: 'Cherries', value: 8 },
    { name: 'Dates', value: 15 },
    { name: 'Elderberries', value: 25 },
    { name: 'Appples', value: 20 },
    { name: 'Banaonas', value: 12 },
    { name: 'Cherjries', value: 8 },
    { name: 'Datjes', value: 15 },
    { name: 'Eldehrberries', value: 25 },
  ];

  view: any[] = [700, 400];
  // xAxisTickFormatting = (value: any) => value;
  arrowIcon = '<i class="fas fa-long-arrow-alt-right fa-2x"></i>';

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country \u2192';
//   xAxisLabel = 'Country';
// xAxisLabelArrow = '\u2192'; // arrow symbol
// xAxisLabelStyle = {'position': 'relative', 'text-align': 'center'};
  
  // xAxisLabel = 'Country \u2192';
// xAxisLabelStyle = {'font-size': '106px'};

  showYAxisLabel = true;
  yAxisLabel = 'Population \u2192' ;
  barPadding = 30;
  roundDomains = true;
  showDataLabel = true;

  colorScheme = {
    domain: ['#47a3eb'],
  };
  constructor() {}

  legendItems = [
    {color: '#ff0000', name: 'Red'},
    {color: '#00ff00', name: 'Green'},
    {color: '#0000ff', name: 'Blue'},
    {color: '#ffff00', name: 'Yellow'}
  ];
  

  ngOnInit() {}
  onSelect(event) {
    console.log(event);
  }
  // xAxisTickFormatting = (value: any) => {
  //   return `<text transform="rotate(-30)">${value}</text>`;
  // };
}
