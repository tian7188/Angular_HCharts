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
  @Input() curveDatas: any = [];
  @Input() chartProps: ChartProp[][] = [];
  @Input() holeId: number = 36821;
  @Input() useDummy: boolean = false;

  holeChanged: boolean = false;

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
        interval: 120,
        isDepthAxis: false,
        numOfPoints: 1000
      }
    };

    effect(() => {
      const names = this.dataService.plotNamesSignal();
      const datas = this.dataService.plotDataSignal();

      //find min and max values
      const minVs: number[] = [];
      const maxVs: number[] = [];
      for (var i = 0; i < datas.length; i++) {
        const data =  datas[i] as DataPoint[]
        minVs[i] = datas[i].reduce((min: number, p: DataPoint) => p.y < min ? p.y : min, datas[i][0].y);
        minVs[i] = Math.floor(minVs[i]);
        maxVs[i] = datas[i].reduce((max: number, p: DataPoint) => p.y > max ? p.y : max, datas[i][0].y);
        maxVs[i] = Math.ceil(maxVs[i]);
      }

      const numOfCharts = this.dataService.numOfCharts + 1;

      // Clear arrays before populating them
      for (let i = 0; i < numOfCharts; i++) {
        // Initialize arrays for each index if they don't exist yet
        this.curveDatas[i] = []
        this.chartProps[i] = []
      }

      //set axis  with depth curve data (only one curve)
      this.curveDatas[0] = [];
      this.curveDatas[0].push(datas[0]);
      this.curveDatas[0].push(datas[0]);

      //set curve names and data
      let numCurves : number = 10;// names.length;
      for (let i = 1; i < numCurves; i++) {
        const index = i < 6 ? i : (i % 6) + 1;

        // Populate with names and data for each pair of charts
        this.curveDatas[index].push(datas[i]);

        // Push a ChartProp object
        this.chartProps[index].push(new ChartProp({ title: names[i], color: daqColors[i], minValue: minVs[i], maxValue: maxVs[i] }));
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

    this.holeChanged = true;
  }

  onAxisToggle(selectValue: string) {
    if (this.adxQueryRequest === undefined) {
      return;
    }

    const isDepthAxis = selectValue === 'depth';
    this.adxQueryRequest.queryParams.isDepthAxis = isDepthAxis;
   
    this.reload_data();

    setTimeout(() => {
    this.resetZoom();
    }, 800);
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
      if (this.holeId === 36821) {
        request.holeLookupKey.fileConfigLookupKey.secondaryValue = 739;
      }
      else if (this.holeId === 3803) {
        request.holeLookupKey.fileConfigLookupKey.secondaryValue = 96;
      }
        
      request.queryParams.interval = request.queryParams.isDepthAxis ? 0.5 : 120;

      
      //load data from daq-api
      this.dataService.reloadData(request);
    }

    if(this.holeChanged) {
      this.resetZoom();
      this.holeChanged = false;
    }
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

  resetZoom() {
    if (this.firstDaqchartComponent) {
      this.firstDaqchartComponent.resetZoom();
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
