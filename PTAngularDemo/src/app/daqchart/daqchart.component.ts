import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, inject, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the theme file
import { DAQPointerEventObject, ZoomEventObject,  ZoomSelectionService } from '../zoom-selection.service';
import { daqColors } from '../plot/plot.component';


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css',
})

export class DaqChartComponent implements OnInit, AfterViewInit, OnChanges {


  zoomSelectionService = inject(ZoomSelectionService);

  chartId: string = '';
  chart: Highcharts.Chart | undefined;

  @Input() chartDatas: any[] = [];
  @Input() seriesNames: string[] = [];

  chartInitialized: boolean = false;

  crosshairOptions: any = {
    width: 3,
    color: '#6C4DFF',
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

      visible: this.isFirstChart(), // Hide X-axis except for the first chart

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
          fontSize: '15px'
        }
      },

    },

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
      valueSuffix: " m/s"
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

  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions,
      () => {
        this.chartInitialized = true;
        setTimeout(() => { this.updateChartOptions(); }, 500);
      });
  }
  
  private updateChartOptions() {
    // Assuming chartOptions is an object with series array
    if (this.chart && this.chartOptions && this.chartOptions.series && this.chartOptions.series.length > 0) {

      // Initialize series
      const series: Highcharts.SeriesOptionsType[] = this.chartDatas.map((data, index) => ({
        type: 'spline', // Example type, adjust as needed
        color: this.getColor(index),
        name: this.seriesNames && this.seriesNames.length > index ? this.seriesNames[index] : `Series ${index + 1}`,
        visible:  !!data , // Hide the series if no data
        data: data || [],// Empty data for the first series
       // yAxis: index % 2 === 0 ? 0 : 1, // Assign the first half of the series to the first y-axis and the second half to the second y-axis
      }));
          

      this.chartOptions = {
        chart: {
          backgroundColor: this.isFirstChart() ? '#a6aaaa' : '#ebeff1' // Set the background color of the chart
        },
        xAxis: {
          type: "datetime", // Set xAxis type as datetime
          zoomEnabled: true, // Enable zooming along the x-axis
          visible: this.isFirstChart(), // Hide X-axis except for the first chart

        },
        series: series
      };

      //more...


      // Create a new object reference to trigger change detection
      this.chart.update(this.chartOptions, true);
    }
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
    if (this.chart) {
      const chartIndex = this.chart.index;
      const numCharts = 5;

      // Use a formula to generate a unique index for each series
      const uniqueSeriesIndex = chartIndex * numCharts + seriesIndex;

      console.log('color index:', uniqueSeriesIndex, uniqueSeriesIndex % daqColors.length);

      return daqColors[uniqueSeriesIndex % daqColors.length];

    }

    return 'black';
  }

}
