import { Injectable, signal } from '@angular/core';

export interface DataPoint {
  x: number;
  y: number;
}


@Injectable({
  providedIn: 'root'
})


export class DaqDataService {

  plotDataSignal = signal<DataPoint[]>([]);

  numOfCharts: number = 5;
  constructor() { }

  reloadData(){
    const points: any[] = [];

    for (let i = 0; i < this.numOfCharts; i++) {
      const temp = this.generateData();
      points.push(temp);
    }

    this.plotDataSignal.set(points);
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