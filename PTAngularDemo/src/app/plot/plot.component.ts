import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DaqChartComponent } from '../daqchart/daqchart.component';
import {DaqDataService} from '../daq-data.service'; 



@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})
export class PlotComponent implements OnInit {

  plotData: any[] = [];

  constructor(private dataService: DaqDataService) {
    this.plotData = this.dataService.reloadData();

  }

  ngOnInit(): void {
    setTimeout(() => { this.reload_data(); }, 1000);
  }

  reload_data() {
    this.plotData = this.dataService.reloadData();   
  }
  
}
