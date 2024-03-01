

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

interface SeriesData {
  x: number;
  y: number;
}


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css'
})


export class DaqChartComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.reload_data();
  }


  highcharts: typeof Highcharts = Highcharts;

  updateFlag = false;

  data: SeriesData[] = [];

  chartOptions: Highcharts.Options = {
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
        data: this.data,
      },
    ],
  };


  reload_data() {
    var count = Math.floor(Math.random() * 100);
    console.log(count);

    const randomData: SeriesData[] = [];
    for (let i = 0; i < count; i++) {
      const randomX = i;
      const randomY = Math.random() * 100; // Random y between 0 and 100
      randomData.push({ x: randomX, y: randomY });
    }

    this.data = randomData;

    if (this.chartOptions.series) {
      this.reBindingData(this.chartOptions.series[0], this.data);
    }

  }


  reBindingData(series: Highcharts.SeriesOptionsType, data: SeriesData[]) {
    if (this.chartOptions.series) {
      if (series && data && data.length > 0) {
        (series as any).data = data;
      }
    }

    this.updateFlag = true;
    setTimeout(() => {
      this.updateFlag = false;
    }, 100);
  }





}
