import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DaqChartComponent } from './daqchart/daqchart.component';
import { PlotComponent } from './plot/plot.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor } from '../CustomHttpInterceptor';
import { DaqchartHeaderComponent } from './daqchart-header/daqchart-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {ButtonsModule} from "@progress/kendo-angular-buttons";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IconsModule } from "@progress/kendo-angular-icons";
import { LabelModule } from "@progress/kendo-angular-label";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";

@NgModule({
  declarations: [
    AppComponent,
    DaqChartComponent,
    PlotComponent,
    DaqchartHeaderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule, // Import FormsModule
    ReactiveFormsModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    FontAwesomeModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    LabelModule,
    LayoutModule,
    DropDownsModule,
    BrowserAnimationsModule,


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
