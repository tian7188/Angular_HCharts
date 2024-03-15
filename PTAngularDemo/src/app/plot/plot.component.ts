import { Component, OnInit, AfterViewInit, inject, Input, effect, input, EventEmitter, Output, ViewChild } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 
import { ZoomSelectionService } from '../zoom-selection.service';
import { DaqChartComponent } from '../daqchart/daqchart.component';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  @ViewChild(DaqChartComponent) firstDaqchartComponent: DaqChartComponent | undefined;

  dataService = inject(DaqDataService);
  zoomSelectionService = inject(ZoomSelectionService);

  curveNames: string[][] = [];
  curveDatas: any = [];

  @Input() holeId: number = 36821;
  @Input() useDummy: boolean = true;

  constructor() {
    effect(() => {
      const names = this.dataService.plotNamesSignal();
      const datas = this.dataService.plotDataSignal();

      let numOfCharts = this.dataService.numOfCharts;
      // Clear arrays before populating them
      this.curveNames = [];
      this.curveDatas = [];

      //set axis names and data
      this.curveNames[0] = [];
      this.curveDatas[0] = [];
      this.curveNames[0].push('Time');
      this.curveDatas[0].push(datas[0]);


      //set curve names and data
      for (let index = 1; index <= numOfCharts; index++) {

        // Initialize arrays for each index
        this.curveNames[index] = [];
        this.curveDatas[index] = [];

        // Populate with names and data for each pair of charts
          this.curveNames[index].push(names[index], names[index + 1]);
          this.curveDatas[index].push(datas[index], datas[index + 1]);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.reload_data();
  }

  reload_data() {
    if (this.useDummy) {
      this.dataService.reloadData_local();
    }
    else {
      this.dataService.reloadData(this.holeId);
    }


  }

  searchData() {
    // Method to handle search functionality


    // Perform your search logic here, such as filtering data based on the search query
    // Once you have filtered data, you can update your chart data accordingly

    this.reload_data();
  }

  useLocalData() {
    this.reload_data();
  }

  zoomIn(): void {
    // Call the zoomIn method on the first child component
    if (this.firstDaqchartComponent) {
      this.firstDaqchartComponent.zoomIn();
    }
  }

  zoomOut(): void {
    // Call the zoomIn method on the first child component
    if (this.firstDaqchartComponent) {
      this.firstDaqchartComponent.zoomOut();
    }
  }

  restoreOrignal() {
    if (this.firstDaqchartComponent) {
      this.firstDaqchartComponent.restoreOrignal();
    }
  }
}
