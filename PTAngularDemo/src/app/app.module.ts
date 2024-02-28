import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DaqChartComponent } from './daqchart/DaqChartComponent';

@NgModule({
  declarations: [
    AppComponent,
    DaqChartComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
