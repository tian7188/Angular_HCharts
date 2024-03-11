import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the theme file
import { ZoomSelectionService } from '../zoom-selection.service';


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css',
})

export class DaqChartComponent implements OnInit, AfterViewInit , OnChanges {

  zoomSelectionService = inject(ZoomSelectionService);

  chartId: string = '';
  chart: Highcharts.Chart | undefined;

  @Input() chartData: any;
  @Input() seriesName: string = 'curve';

  chartInitialized: boolean = false;

  constructor() {
   // darkUnica(Highcharts);
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);

    this.zoomSelectionService.zoomSelectionEvent.subscribe(selection => {
      this.applyZoomSelection(selection);
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
        name: this.seriesName,
        // data: this.data,
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
        allowPointSelect: true
      }
    },



  };
    

  ngOnInit(): void {
    setTimeout(() => { this.initChart(); }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInitialized
      && changes['chartData']
      && !changes['chartData'].firstChange) {
      this.updateChart();
    }

    console.log('Series Name:', this.seriesName);
  }

  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions,
      () => {
        this.chartInitialized = true;
        setTimeout(() => { this.updateChart(); }, 100);
      });
  }

  private applyZoomSelection(selection: Highcharts.SelectEventObject) {
    if (selection.xAxis && this.chart) {
      const xAxis = selection.xAxis[0];
      this.chart.xAxis[0].setExtremes(xAxis.min, xAxis.max);
    }
  }

  private updateChart(): void {
    this.updateChartData();
    this.updateChartOptions();
  }

  private updateChartData(): void {
    if (this.chart && this.chart.series && this.chart.series[0]) {
      this.chart.series[0].setData(this.chartData, true);

    } else {
      console.warn('Chart is not initialized or has no series.');
    }
  }

  private updateChartOptions() {
    // Assuming chartOptions is an object with series array
    if (this.chart && this.chartOptions && this.chartOptions.series && this.chartOptions.series.length > 0) {
      // Update the name of the first series in the chartOptions
      this.chartOptions.series[0].name = this.seriesName;

      //more...

      // Create a new object reference to trigger change detection
      this.chart.update(this.chartOptions, true);
    }
  }





}
