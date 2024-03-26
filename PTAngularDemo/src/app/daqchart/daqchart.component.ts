import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  inject,
  ElementRef,
  EventEmitter,
  Output,
  input, ChangeDetectorRef
} from '@angular/core';
import * as Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the theme file
import { DAQPointerEventObject, ZoomEventObject, ZoomSelectionService } from '../zoom-selection.service';
import { ChartProp, daqColors } from '../plot/plot.component';
import { DataPoint } from '../../AdxQueryRequestModel';
import { formatDateTime, formatDepthLabel } from './formatDateTime';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css',
})

export class DaqChartComponent implements OnInit, AfterViewInit, OnChanges {

  zoomSelectionService = inject(ZoomSelectionService);

  axisToggle = new FormControl('depth');

  chartId: string = '';
  chart: Highcharts.Chart | undefined;

  @Input() chartDatas: any[] = [];
  @Input() seriesNames: string[] = [];
  @Input() chartProps: ChartProp[] = [];

  @Output() axisToggleEvent = new EventEmitter<string>();

  chartInitialized: boolean = false;

  crosshairOptions: any = {
    width: 3,
    color: 'grey',
    dashStyle: 'longdashdot'
  }

  constructor(private elementRef: ElementRef) {
    // darkUnica(Highcharts);
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);

    this.zoomSelectionService.zoomSelectionEvent.subscribe(selection => {
      if (selection.originalEvent && selection.xAxis && selection.xAxis[0] && this.chart) {
        const xAxis = selection.xAxis[0];
        this.chart.xAxis[0].setExtremes(xAxis.min, xAxis.max);
      }
    });


    this.zoomSelectionService.zoomEvent.subscribe(event => {
      if (event && event.chartIndex != this.chart?.index
        && event.xAxisMin && event.xAxisMax
        && this.chart) {
        this.chart.xAxis[0].setExtremes(event.xAxisMin, event.xAxisMax);
      }
    });

    this.zoomSelectionService.crosshairPositionChange.subscribe(event => {
      if (this.chart && event.chartIndex !== this.chart.index) {
        if (event.pointerEventObject) {
          // Normalize event coordinates
          const normalizedEvent = this.chart.pointer.normalize(event.pointerEventObject);

          // Highlight the hovered point
          const point = this.chart.series[0].searchPoint(normalizedEvent, true);
          if (point && event) {
            point.onMouseOver(); // Show the hover marker
            this.chart.xAxis[0].drawCrosshair(event.pointerEventObject, point); // Show the crosshair
          }
        }
      }
    });

    // Attach mousemove event listener to the chart container element
    this.elementRef.nativeElement.addEventListener('mousemove', this.onChartMouseMove.bind(this));
  }


  // Method to handle mousemove event
  onChartMouseMove(event: MouseEvent) {
    if (!this.chart) return;

    // Type assertion to cast MouseEvent to PointerEventObject
    const pointerEvent = event as Highcharts.PointerEventObject;

    this.zoomSelectionService.crosshairPositionChange.emit({
      chartIndex: this.chart.index,
      pointerEventObject: pointerEvent
    });

    //// Normalize event coordinates
    //const normalizedEvent = this.chart.pointer.normalize(pointerEvent);

    //// Highlight the hovered point
    //const point = this.chart.series[0].searchPoint(normalizedEvent, true);
    //if (point && event) {
    //  point.onMouseOver(); // Show the hover marker
    //  this.chart.xAxis[0].drawCrosshair(pointerEvent, point); // Show the crosshair
    //}
  }

  ngOnInit(): void {
    setTimeout(() => { this.initChart(); }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInitialized
      && changes['chartDatas']
      && !changes['chartDatas'].firstChange) {
      this.updateChartOptions();
    }

    //console.log('Series Name:', this.seriesNames);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.chart) {

      }
    }, 1000);
  }



  chartOptions: Highcharts.Options = {
    chart: {
      inverted: true,
      type: "spline",
      backgroundColor: '#ebeff1',
      zooming: {
        type: "x"
      },
      events: {
        selection: (event) => {
          //console.log('Selection event triggered by chart ' + this.chart?.index);

          this.zoomSelectionService.sendZoomSelection(event);

          return false;
        },
      }
    },
    title: {
      text: ''
    },
    subtitle: {
      // text: "ptian trial"
    },
    xAxis: [{
      /* type: "datetime",*/ // Set xAxis type as datetime
      zoomEnabled: true, // Enable zooming along the x-axis

      visible: false,

      minPadding: 0,
      maxPadding: 0,
      lineColor: '#7E7D83',
      lineWidth: 1,
      tickColor: '#7E7D83',

      crosshair: this.crosshairOptions,
      //events: {
      //  setExtremes: syncExtremes,
      //  afterSetExtremes: afterSetExtremes
      //},

      scrollbar: {
        enabled: true
      },
      title: {
        text: "Time",
        style: {
          fontSize: '14px'
        }
      },
    },

    {

      visible: false,
      minPadding: 0,
      maxPadding: 0,
      lineColor: '#7E7D83',
      lineWidth: 1,
      tickColor: '#7E7D83',

      title: {
        text: "Depth (m)",
        style: {
          fontSize: '14px'
        }
      },

      scrollbar: {
        enabled: true
      },
      /* linkedTo: 0,*/
    }

    ],

    yAxis: [
      {
        title: {
          text: ""
        },
        opposite: true,
        zoomEnabled: true // Enable zooming along the x-axis
      },
      {
        title: {
          text: ""
        },
        opposite: true,
        zoomEnabled: true // Enable zooming along the x-axis
      },
    ],

    tooltip: {
      valueSuffix: " m/s",
      shared: true,

      //formatter: function () {
      //  let tooltip = '';
      //  if (this.points && this.points.length > 0 && this.points[0].point) {
      //    tooltip += '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.points[0].point.x) + '</b><br/>';
      //    this.points.forEach(function (point) {
      //      tooltip += '<span style="color:' + point.series.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.point.y + '</b><br/>';
      //    });
      //  }
      //  return tooltip;
      //},
    },
    series: [
      {
        type: 'spline',
      },
      {
        type: 'spline',
      },
    ],

    // Optionally, enable the range selector
    rangeSelector: {
      enabled: true
    },
    // Optionally, enable zoom buttons
    navigation: {
      buttonOptions: {
        enabled: true
      }
    },
    // Optionally, enable the navigator for a more interactive zooming experience
    navigator: {
      enabled: true
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
      },
    },


  };



  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions,
      () => {
        this.chartInitialized = true;
        setTimeout(() => {
          this.updateChartOptions();
        }, 500);
      });
  }

  private updateChartOptions() {
    // Assuming chartOptions is an object with series array
    if (this.chart && this.chartOptions && this.chartOptions.series && this.chartOptions.series.length > 0) {

      if (!this.isFirstChart()) {
        const series: Highcharts.SeriesOptionsType[] = this.chartDatas.map((data, index) => ({
          type: 'spline',
          color: this.getColor(index),
          visible: !!data,
          data: data || [],// Empty data for the first series
          // yAxis: index % 2 === 0 ? 0 : 1, // Assign the first half of the series to the first y-axis and the second half to the second y-axis
        }));

        this.chartOptions = {
          series: series
        };
      }
      else { // for axis chart....

        const seriesData = this.chartDatas[0] as DataPoint[]; // Assuming data is defined within the component

        // Initialize series
        const series: Highcharts.SeriesOptionsType[] = this.chartDatas.map((data, index) => ({
          type: 'spline', // Example type, adjust as needed
          visible: !!data, // Hide the series if no data
          data: data || [],// Empty data for the first series
          xAxis: index === 0 ? 0 : 1, // Assign the first half of the series to the first x-axis and the second half to the second x-axis
        }));

        this.chartOptions = {
          chart: {
            backgroundColor: '#ccc'
          },
          xAxis: [
            {
              zoomEnabled: true, // Enable zooming along the x-axis
              visible: true,
              labels: {
                formatter: function () {
                  return formatDateTime(this.value as string);
                },
                style: {
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }
              },
            },
            {
              zoomEnabled: true, // Enable zooming along the x-axis
              visible: true,
              labels: {
                formatter: function () {
                  return formatDepthLabel(this.value, seriesData);
                },
                style: {
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }
              },
              linkedTo: 0
            },
          ],

          tooltip: {
            enabled: false
          },
          series: series
        };

      }


      //more...


      // Create a new object reference to trigger change detection
      this.chart.update(this.chartOptions, true);
    }
  }

  onAxisToggle(selectedValue: string) {
    this.axisToggleEvent.emit(selectedValue);
  }


  getAxisData(data: any): any {
    //assign data.y to be 1
    return data.map((d: any) => {
      return {
        x: d.x,
        y: 0
      };
    });
  }


  zoom(factor: number, isUserAction: boolean = false): void {
    if (this.chart) {
      // Get the current minimum and maximum values of the visible range on the x-axis
      const min = this.chart.xAxis[0].getExtremes().min;
      const max = this.chart.xAxis[0].getExtremes().max;

      // Calculate the middle point of the visible range
      const middle = (min + max) / 2;

      // Calculate the new range based on the zoom factor
      const newMin = middle - (middle - min) * factor;
      const newMax = middle + (max - middle) * factor;

      // Set the new range to zoom in or out
      this.chart.xAxis[0].setExtremes(newMin, newMax);

      this.zoomSelectionService.sendZoomEvent({
        chartIndex: this.chart.index,
        xAxisMin: newMin,
        xAxisMax: newMax
      });
    }
  }

  zoomIn(): void {
    this.zoom(1 - 0.5, true); // Zoom in by reducing the range to 50% of the current range
  }

  zoomOut(): void {
    this.zoom(1 + 0.5, true); // Zoom out by expanding the range to 150% of the current range
  }

  restoreOrignal() {
    if (this.chart) {
      this.chart.xAxis[0].setExtremes(undefined, undefined);
      this.zoom(1, true)
    }
  }

  isFirstChart(): boolean | undefined {
    if (this.chart) {
      return this.chart.index === 0;
    }

    return true;
  }

  getColor(seriesIndex: number): string | Highcharts.GradientColorObject | Highcharts.PatternObject | undefined {
    if (this.chart && this.chartProps[seriesIndex]) {
      return this.chartProps[seriesIndex].color;
    }
    return 'black';
  }

}







