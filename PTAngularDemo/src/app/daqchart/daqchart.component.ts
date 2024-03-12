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

  @Input() chartDatas: any[] = [];
  @Input() seriesNames: string[] = [];

  chartInitialized: boolean = false;

  constructor() {
   // darkUnica(Highcharts);
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);

    this.zoomSelectionService.zoomSelectionEvent.subscribe(selection => {
      if (selection.originalEvent && selection.xAxis && selection.xAxis[0]) {
        this.applyZoomSelection(selection);
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
      this.updateChart();
    }

    console.log('Series Name:', this.seriesNames);
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
      //this.chart.xAxis[0].setExtremes(xAxis.min, xAxis.max);

      // Apply zoom selection to xAxis
      let i = 0;
      selection.xAxis.forEach(axis => {
        if (this.chart) {
          // Apply zoom selection to each xAxis
          this.chart.xAxis[i].setExtremes(xAxis.min, xAxis.max);
          i++;
        }
      });

      console.log('Zoom selection applied - chart' + this.chart.index + '  ' + 'xAxis.min: ' + xAxis.min + '  ');

    }
  }

  private updateChart(): void {
   // this.updateChartData();
    this.updateChartOptions();
  }

  //private updateChartData(): void {
  //  if (this.chart && this.chart.series && this.chart.series[0]) {
  //    this.chart.series[0].setData(this.chartDatas[0], true);
  //   // this.chart.series[1].setData(this.chartData, true);

  //  } else {
  //    console.warn('Chart is not initialized or has no series.');
  //  }
  //}

  private updateChartOptions() {
    // Assuming chartOptions is an object with series array
    if (this.chart && this.chartOptions && this.chartOptions.series && this.chartOptions.series.length > 0) {
      // Update the name of the first series in the chartOptions
      //this.chartOptions.series[0].name = this.seriesNames[0];
    //  this.chartOptions.series[1].name = this.seriesNames[1];

      //for (let i = 0; i < this.seriesNames.length; i++) {
      //  this.chartOptions.series[i].name = this.seriesNames[i];
      //}

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





}
