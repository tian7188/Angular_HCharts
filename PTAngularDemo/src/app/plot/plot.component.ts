import { Component, OnInit, AfterViewInit, inject, Input, effect, input, EventEmitter, Output } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 
import { ZoomSelectionService } from '../zoom-selection.service';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  dataService = inject(DaqDataService);
  zoomSelectionService = inject(ZoomSelectionService);

  curveNames: string[][] = [];
  curveDatas: any = [];

  @Input() searchQuery: string = '';
  @Input() localdata: boolean = true;

  constructor() {
    effect(() => {
      const names = this.dataService.plotNamesSignal();
      const datas = this.dataService.plotDataSignal();

      let numOfCharts = this.dataService.numOfCharts;
      // Clear arrays before populating them
      this.curveNames = [];
      this.curveDatas = [];

      for (let index = 0; index < numOfCharts; index++) {

        // Initialize arrays for each index
        this.curveNames[index] = [];
        this.curveDatas[index] = [];

        // Populate with names and data for each pair of charts
        this.curveNames[index].push(names[index], names[index + 1]);
        this.curveDatas[index].push(datas[index], datas[index + 1]);

        if (numOfCharts-1 == index) {
          this.curveNames[index].push(names[0], names[2]);
          this.curveDatas[index].push(datas[0], datas[2]);
        }
      }





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
