import { Component, OnInit, effect, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DaqChartComponent } from '../daqchart/daqchart.component';
import {DaqDataService} from '../daq-data.service'; 



@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})
export class PlotComponent implements OnInit {

  dataService = inject(DaqDataService);

  constructor() {    
  }

  ngOnInit(): void {
    this.reload_data();
  }

  reload_data() {
    this.dataService.reloadData();   
  }
  
}
