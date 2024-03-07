import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DaqChartComponent } from './daqchart/daqchart.component';
import { PlotComponent } from './plot/plot.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor } from '../CustomHttpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    DaqChartComponent,
    PlotComponent
  ],

  imports: [
    BrowserModule,
    FormsModule, // Import FormsModule
    AppRoutingModule,
    HighchartsChartModule,
    BrowserModule,
    HttpClientModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
