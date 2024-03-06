import { Injectable } from '@angular/core';

interface DataPoint {
  x: number;
  y: number;
}


@Injectable({
  providedIn: 'root'
})


export class DaqDataService {
  numOfCharts: number = 5;
  constructor() { }

  reloadData(): any[] {
    const plotData: any[] = [];

    for (let i = 0; i < this.numOfCharts; i++) {
      plotData.push(this.generateData());
    }

    return plotData;
  }


  private generateData(): DataPoint[] {
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
