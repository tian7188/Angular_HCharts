import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the theme file


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css',
})

export class DaqChartComponent implements OnInit, AfterViewInit , OnChanges {

  chartId: string = '';
  chart: Highcharts.Chart | undefined;
  @ViewChild('chartId') chartElement: ElementRef | undefined;

  @Input() chartData: any;
  @Input() seriesName: string = 'petertian';

  chartInitialized: boolean = false;

  constructor() {
   // darkUnica(Highcharts);
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);   
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.chart) {
        this.triggerSelectionEvent();
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

          if (this.chart) {
            const xAxis = this.chart.xAxis[0];
            xAxis.setExtremes(event.xAxis[0].min, event.xAxis[0].max);

            return false;
          }
          return false; // Prevent default action (zooming)
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

  // Function to programmatically trigger the selection event by simulating mouse events
  triggerSelectionEvent() {
    if (this.chartElement)
    {
      const chartElement = this.chartElement.nativeElement;

      const chartRect = chartElement.getBoundingClientRect();
      const startX = chartRect.left + 100; // Start X position for mouse drag (adjust as needed)
      const startY = chartRect.top + 100; // Start Y position for mouse drag (adjust as needed)
      const endX = chartRect.left + 200; // End X position for mouse drag (adjust as needed)
      const endY = chartRect.top + 100; // End Y position for mouse drag (adjust as needed)

      // Trigger mouse down event
      chartElement.dispatchEvent(new MouseEvent('mousedown', { clientX: startX, clientY: startY }));

      // Trigger mouse move event
      chartElement.dispatchEvent(new MouseEvent('mousemove', { clientX: endX, clientY: endY }));

      // Trigger mouse up event
      chartElement.dispatchEvent(new MouseEvent('mouseup', { clientX: endX, clientY: endY }));
    }
  }

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
