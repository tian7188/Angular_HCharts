import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DaqChartComponent } from '../daqchart/daqchart.component';
//import {DataServcie} from '../data.service'; }

interface DataPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})
export class PlotComponent implements OnInit {
  //constructor(private dataService: DataService) { }
  numOfCharts: number = 5;

  plotData: DataPoint[][] = [];

  constructor() {
    for (let i = 0; i < this.numOfCharts; i++) { // Generate 3 sets of data, you can adjust the number as needed
      const randomData: DataPoint[] = [];
      this.plotData.push([]);
    }

  }

  ngOnInit(): void {
    setTimeout(() => { this.reload_data(); }, 1000);
  }

  reload_data() {
    this.plotData = [];

    // Generate multiple sets of data
    for (let i = 0; i < this.numOfCharts; i++) { // Generate 3 sets of data, you can adjust the number as needed
      this.plotData.push(this.generateData());
    }
  }


  generateData(): DataPoint[] {
    // Simulate reloading data for the first chart
    var count = Math.floor(Math.random() * 100);

    const randomData: DataPoint[] = [];
    for (let i = 0; i < count; i++) {
      const randomX = i;
      const randomY = Math.random() * 100; // Random y between 0 and 100
      randomData.push({ x: randomX, y: randomY });
    }

    return randomData;
  }

  
}
