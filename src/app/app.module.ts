import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { StackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDonutComponent } from './donut/ngx-donut/ngx-donut.component';
import { D3DonutComponent } from './donut/d3-donut/d3-donut.component';

import { D3BarComponent } from './bar/d3-bar/d3-bar.component';
import { D3Bar1Component } from './bar/d3-bar-1/d3-bar-1.component';
import { NgxBarComponent } from './bar/ngx-bar/ngx-bar.component';

import {D3V4LineComponent} from './line-chart/d3-v4-line/d3-v4-line.component';

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    MultiselectComponent,
    SearchFilterComponent,
    GroupedBarChartComponent,
    StackedBarChartComponent,
    NgxDonutComponent,
    D3DonutComponent,
    D3BarComponent,
    NgxBarComponent,
    D3Bar1Component,D3V4LineComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
