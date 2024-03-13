import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the theme file
import { ZoomEventObject, ZoomSelectionService } from '../zoom-selection.service';


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css',
})

export class DaqChartComponent implements OnInit, AfterViewInit , OnChanges {

  zoomSelectionService = inject(ZoomSelectionService);

  chartId: string = '';
  chart: Highcharts.Chart | undefined;

  @Input() chartDatas: any[] = [];
  @Input() seriesNames: string[] = [];

  chartInitialized: boolean = false;

  constructor() {
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
          console.log('Selection event triggered');

          this.zoomSelectionService.sendZoomSelection(event);

          return false;
        }
      }

    },
    title: {
      text: ''
    },
    subtitle: {
      // text: "ptian trial"
    },
    xAxis: {
      type: "datetime", // Set xAxis type as datetime
      zoomEnabled: true, // Enable zooming along the x-axis
     

    },
    yAxis: {
      title: {
        text: "m/s"
      },
      zoomEnabled: true // Enable zooming along the x-axis
    },
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

    console.log('Series Name:', this.seriesNames);
  }

  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions,
      () => {
        this.chartInitialized = true;
        setTimeout(() => { this.updateChartOptions(); }, 100);
      });
  }
  
  private updateChartOptions() {
    // Assuming chartOptions is an object with series array
    if (this.chart && this.chartOptions && this.chartOptions.series && this.chartOptions.series.length > 0) {
      
      // Initialize series
      const series: Highcharts.SeriesOptionsType[] = this.chartDatas.map((data, index) => ({
        type: 'spline', // Example type, adjust as needed
        name: this.seriesNames && this.seriesNames.length > index ? this.seriesNames[index] : `Series ${index + 1}`,
        visible: !!data, // Hide the series if no data
        data: data || []
      }));
      
      this.chartOptions = {        
        series: series
      };

      //more...


      // Create a new object reference to trigger change detection
      this.chart.update(this.chartOptions, true);
    }
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

}
