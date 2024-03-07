import { Component, OnInit, AfterViewInit, inject, Input, effect } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  dataService = inject(DaqDataService);
  plotData: any = [];

  @Input() searchQuery: string = '';

 

  constructor() {
    effect(() => { this.plotData = this.dataService.plotDataSignal() });
  }

  ngAfterViewInit(): void {
    this.reload_data();
  }

  reload_data() {
    this.dataService.reloadData();
  }

  searchData() {
    // Method to handle search functionality
    console.log("Search query:", this.searchQuery);
    // Perform your search logic here, such as filtering data based on the search query
    // Once you have filtered data, you can update your chart data accordingly
  }

}
