import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DaqChartComponent } from '../daqchart/daqchart.component';
//import {DataServcie} from '../data.service'; }



@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.css'
})
export class PlotComponent implements OnInit {
  //constructor(private dataService: DataService) { }

  constructor() {
    //this.chartSeriesList = [
    //  [],
    //  []
    //];
  }

  ngOnInit(): void {
    
  }

  //chartSeriesList: DataPoint[][] = [];
  


  reload_data() {
    // Simulate reloading data for the first chart
    var count = Math.floor(Math.random() * 100);

    //const randomData: DataPoint[] = [];
    //for (let i = 0; i < count; i++) {
    //  const randomX = i;
    //  const randomY = Math.random() * 100; // Random y between 0 and 100
    //  randomData.push({ x: randomX, y: randomY });
    //}

    //this.chartSeriesList[0] = randomData;

  }


  //reBindingData(series: Highcharts.SeriesOptionsType, data: SeriesData[]) {
  //  if (this.chartOptions.series) {
  //    if (series && data && data.length > 0) {
  //      (series as any).data = data;
  //    }
  //  }

  //  this.updateFlag = true;
  //  setTimeout(() => {
  //    this.updateFlag = false;
  //  }, 100);
  //}

}
