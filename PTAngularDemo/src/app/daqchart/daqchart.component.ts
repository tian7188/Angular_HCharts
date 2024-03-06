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

  private chartInitialized: boolean = false;

  constructor() { }  
   

  readonly chartOptions: Highcharts.Options = {
    chart: {
      inverted: true,
      type: "spline"
    },
    title: {
      text: "Speed"
    },
    subtitle: {
      text: "ptian trial"
    },
    xAxis: {
      //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      //  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
       // data: this.data,
      },
    ],
  };

  ngOnInit(): void {
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);
    setTimeout(() => { this.initChart(); }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInitialized
      && changes['chartData']
      && !changes['chartData'].firstChange) {
      this.updateChart();
    }
  }

  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions,
      () => {
        this.chartInitialized = true;

        setTimeout(() => { this.updateChart(); }, 200);
      });
  }

  private updateChart(): void {
    if (this.chart && this.chart.series && this.chart.series[0]) {
      this.chart.series[0].setData(this.chartData, true);
    } else {
      console.warn('Chart is not initialized or has no series.');
    }
  }



}
