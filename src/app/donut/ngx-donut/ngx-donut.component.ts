import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-donut',
  templateUrl: './ngx-donut.component.html',
  styleUrls: ['./ngx-donut.component.css'],
})
export class NgxDonutComponent implements OnInit {
  data = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
  colorScheme = {
    domain: ['#08DDC1', '#FFDC1B', '#FF5E3A', '#AEAEAE'],
  };
  constructor() {}

  ngOnInit() {}
}
