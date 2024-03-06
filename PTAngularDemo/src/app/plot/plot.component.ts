import { Component, OnInit, AfterViewInit, inject, effect } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  dataService = inject(DaqDataService);
  plotData: any = [];

  constructor() {
    effect(() => { this.plotData = this.dataService.plotDataSignal() });
  }

  ngAfterViewInit(): void {
    this.reload_data();
  }

  reload_data() {
    this.dataService.reloadData();
  }

}
