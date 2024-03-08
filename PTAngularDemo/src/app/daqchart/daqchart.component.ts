import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

interface DataPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css'
})

export class DaqChartComponent implements OnInit, OnChanges {

  chartId: string = '';
  chart: Highcharts.Chart | undefined; 
  @Input() chartData: any;
  @Input() seriesName: string = 'petertian';

  chartInitialized: boolean = false;

  constructor() {
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);   
  }     

  chartOptions: Highcharts.Options = {
    chart: {
      inverted: true,
      type: "spline"
    },
    title: {
      text: "Speed"
    },
    subtitle: {
     // text: "ptian trial"
    },
    xAxis: {
      type: "datetime", // Set xAxis type as datetime
    },
    yAxis: {
      title: {
        text: "m/s"
      }
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
        setTimeout(() => { this.updateChartOptions(); }, 100);
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
