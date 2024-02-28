

import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-daqchart',
  templateUrl: './daqchart.component.html',
  styleUrl: './daqchart.component.css'
})


export class DaqChartComponent implements OnInit {
    constructor() { }

  ngOnInit(): void { }


  highcharts: typeof Highcharts = Highcharts;

  updateFlag = false;

  data = [2,5,7,1,2,9];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Speed"
    },
    subtitle: {
      text: "ptian trial"
    },
    //xAxis: {
    //  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //},
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
    this.setRandomeData();
  }

  setRandomeData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(Math.floor(Math.random() * 10));
    }
    this.chartOptions.series = [{ type: 'line', data }];
    this.updateFlag = true;

  }





}
