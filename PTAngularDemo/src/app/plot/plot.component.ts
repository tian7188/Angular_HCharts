import { Component, OnInit, AfterViewInit, inject, Input, effect, input, EventEmitter, Output, ViewChild, DEFAULT_CURRENCY_CODE, HostListener } from '@angular/core';
import {DaqDataService} from '../daq-data.service'; 
import { ZoomSelectionService } from '../zoom-selection.service';
import { DaqChartComponent } from '../daqchart/daqchart.component';
import { AdxQueryRequestModel, DataPoint, FileLookupType, LoggingFileType } from '../../AdxQueryRequestModel';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})

export class PlotComponent implements AfterViewInit {

  @ViewChild(DaqChartComponent) firstDaqchartComponent: DaqChartComponent | undefined;

  dataService = inject(DaqDataService);
  zoomSelectionService = inject(ZoomSelectionService);

  adxQueryRequest: AdxQueryRequestModel | undefined;
  @Input()  curveNames: string[][] = [];
  @Input() curveDatas: any = [];
  @Input() chartProps: ChartProp[][] = [];

  @Input() holeId: number = 3803;
  @Input() useDummy: boolean = true;

  constructor() {
    this.adxQueryRequest = {
      holeLookupKey: {
        holeId: this.holeId,
        fileConfigLookupKey: {
          loggingFileType: LoggingFileType.Instrumentation,
          secondaryType: FileLookupType.DrillId,
          secondaryValue: 96
        }
      },
      queryParams: {
        interval: 10,
        isDepthAxis: false,
        numOfPoints: 100
      }
    };

    effect(() => {
      const names = this.dataService.plotNamesSignal();
      const datas = this.dataService.plotDataSignal();

      //find min and max values
      const minVs: number[] = [];
      const maxVs: number[] = [];
      for (var i = 0; i < datas.length; i++) {
       // const data =  datas[i] as DataPoint[]
        minVs[i] = datas[i].reduce((min: number, p: DataPoint) => p.y < min ? p.y : min, datas[i][0].y);
        minVs[i] = Math.floor(minVs[i]);
        maxVs[i] = datas[i].reduce((max: number, p: DataPoint) => p.y > max ? p.y : max, datas[i][0].y);
        maxVs[i] = Math.ceil(maxVs[i]);
      }

      let numOfCharts = this.dataService.numOfCharts;
      // Clear arrays before populating them
      this.chartProps = [];
      this.curveNames = [];
      this.curveDatas = [];

      //set axis names and data
      this.curveNames[0] = [];
      this.curveDatas[0] = [];
      this.curveNames[0].push('Time');
      this.curveDatas[0].push(datas[0]);
      this.curveNames[0].push('Depth');
      this.curveDatas[0].push(datas[0]);


      //set curve names and data
      for (let index = 1; index <= numOfCharts; index++) {

        // Initialize arrays for each index
        this.curveNames[index] = [];
        this.curveDatas[index] = [];
        this.chartProps[index] = [];

        // Populate with names and data for each pair of charts
        this.curveNames[index].push(names[index - 1]);
        this.curveDatas[index].push(datas[index - 1]);

        // Push a ChartProp object
        this.chartProps[index].push(new ChartProp({ title: names[index - 1], color: daqColors[index - 1], minValue: minVs[index-1], maxValue: maxVs[index-1] }));
     

        if (index === 2 || index === 4) {
          this.curveNames[index].push(names[index]);
          this.curveDatas[index].push(datas[index]);

          this.chartProps[index].push(new ChartProp({ title: names[index], color: daqColors[index], minValue: minVs[index ], maxValue: maxVs[index] }));
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

  onInputChange(value: string): void {
    this.holeId = parseInt(value, 10); // Parse the input value to a number
  }

  reload_data() {
    if (this.useDummy) {
      this.dataService.reloadData_local();
    }
    else {
      let request = this.adxQueryRequest;
      if (request === undefined) {
        return;
      }     

      request.holeLookupKey.holeId = this.holeId;
      request.holeLookupKey.fileConfigLookupKey.secondaryValue = 96;
      request.queryParams.numOfPoints = 3000;
      request.queryParams.interval = 100;

      //temp code to set interval
      if (this.holeId === 36821) {
        request.queryParams.interval = 0.5;
        request.holeLookupKey.fileConfigLookupKey.secondaryValue = 739;
      }

      //load data from daq-api
      this.dataService.reloadData(request);
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



export const daqColors: string[] = [
  '#7cb5ec', // blue
  '#434348', // dark gray
  '#90ed7d', // green
  '#f7a35c', // orange
  '#8085e9', // purple
  '#f15c80', // pink
  '#e4d354', // yellow
  '#2b908f', // teal
  //'#f45b5b', // red
  '#91e8e1', // light teal
  // Add more colors as needed
];

// chart-props.ts
export class ChartProp {
  title: string = 'GR';
  color: string = 'red';
  minValue: number = 0;
  unit: string = 'm';
  maxValue: number = 100;

  constructor(props: Partial<ChartProp> = {}) {
    Object.assign(this, props);
  }
}
