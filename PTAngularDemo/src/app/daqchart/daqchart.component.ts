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

export class DaqChartComponent implements OnInit {

  chartId: string = '';
  chart!: Highcharts.Chart; //will not be null or undefined after ngOnInit
  @Input() chartData: any;


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
        type: 'line',
       // data: this.data,
      },
    ],
  };

  ngOnInit(): void {
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);
    setTimeout(() => { this.initChart(); }, 1000);
  }

  initChart() {
    this.chart = Highcharts.chart(this.chartId, this.chartOptions);

    this.reload_data();
  }

  reload_data() {
    var count = Math.floor(Math.random() * 100);
    console.log(count);

    const randomData: DataPoint[] = [];
    for (let i = 0; i < count; i++) {
      const randomX = i;
      const randomY = Math.random() * 100; // Random y between 0 and 100
      randomData.push({ x: randomX, y: randomY });
    }

    if (this.chart && this.chart.series[0]) {
      this.chart.series[0].setData(randomData, true);
    }
  }

}
