import { Component, OnInit, AfterViewInit, inject, Input, effect, input, EventEmitter, Output, ViewChild, DEFAULT_CURRENCY_CODE, HostListener } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 
import { ZoomSelectionService } from '../zoom-selection.service';
import { DaqChartComponent } from '../daqchart/daqchart.component';
import { AdxQueryRequestModel, FileLookupType, LoggingFileType } from '../../AdxQueryRequestModel';


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
        this.curveNames[index].push(names[index - 1]);
        this.curveDatas[index].push(datas[index - 1]);

        if (index === 2 || index === 4) {
          this.curveNames[index].push(names[index], names[index + 1]);
          this.curveDatas[index].push(datas[index], datas[index + 1]);
        }
      }
    });
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    // Check if the event target is an app-daqchart component
    event.preventDefault(); // Prevent default behavior of mouse wheel (e.g., scrolling the page)

    // Check if the Shift key is pressed
    const isShiftKeyPressed = event.shiftKey;

    if (isShiftKeyPressed && this.firstDaqchartComponent) {
      // Calculate zoom factor based on mouse wheel delta
      let zoomFactor = event.deltaY > 0 ? 1.2 : 0.8; // Example values, adjust as needed

      // Apply constraint to zoom factor, e.g., limit zooming to 50% or 200%
      zoomFactor = Math.min(Math.max(zoomFactor, 0.5), 2);
//
      // Call the zoom method of the daqChart component with the calculated zoom factor
      this.firstDaqchartComponent.zoom(zoomFactor);
    }
  }

  ngAfterViewInit(): void {
    this.reload_data();
  }

  reload_data() {
    if (this.useDummy) {
      this.dataService.reloadData_local();
    }
    else {

      const adxQueryRequest: AdxQueryRequestModel = {
        holeLookupKey: {
          holeId: this.holeId,
          fileConfigLookupKey: {
            loggingFileType: LoggingFileType.Instrumentation,
            secondaryType: FileLookupType.DrillId,
            secondaryValue: 96
          }
        },
        queryParams: {
            interval: 0,
            isDepthAxis: false,
            numOfPoints: 0
        }
      };

      adxQueryRequest.holeLookupKey.holeId = this.holeId;
      adxQueryRequest.holeLookupKey.fileConfigLookupKey.secondaryValue = 96;

      adxQueryRequest.queryParams.interval = 120;
      adxQueryRequest.queryParams.isDepthAxis = false;
      adxQueryRequest.queryParams.numOfPoints = 3000;

       
      








      this.dataService.reloadData(adxQueryRequest);
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
