import { Component, OnInit, AfterViewInit, inject, Input, effect, input } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  dataService = inject(DaqDataService);

  curveNames: string[] = [];
  curveDatas: any = [];

  @Input() searchQuery: string = '';
  @Input() localdata: boolean = false;

 

  constructor() {
    effect(() => {
      this.curveNames = this.dataService.plotNamesSignal()
      this.curveDatas = this.dataService.plotDataSignal()
    });
  }

  ngAfterViewInit(): void {
    this.reload_data();
  }

  reload_data() {
    if (this.localdata) {
      this.dataService.reloadData_local();
    }
    else {
      this.dataService.reloadData();
    }


  }

  searchData() {
    // Method to handle search functionality
    console.log("Search query:", this.searchQuery);
    // Perform your search logic here, such as filtering data based on the search query
    // Once you have filtered data, you can update your chart data accordingly
  }

  useLocalData() {
    console.log("use local data: ", this.localdata);

    this.reload_data();
  }
}
