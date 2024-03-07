import { Injectable, inject, signal } from '@angular/core';
import { queryRequestModel, AdxQueryResponse, FileLookupType, LoggingFileType } from '../AdxQueryRequestModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DataPoint {
  x: number;
  y: number;
}


@Injectable({
  providedIn: 'root'
})


export class DaqDataService {

  http = inject(HttpClient);

  plotDataSignal = signal<DataPoint[]>([]);
  numOfCharts: number = 5;

  constructor() { }

  //load data from daq-api
  reloadData() {
    const points: any[] = [];

    const postRequest: queryRequestModel = {
      holeLookupKey: {
        holeId: 3803,
        fileConfigLookupKey: {
          loggingFileType: LoggingFileType.Instrumentation,
          secondaryType: FileLookupType.DrillId,
          secondaryValue: 96
        }
      },
      queryParams: {
        interval: 10,
        isDepthAxis: false,
        numOfPoints: 100
      }
    };


    this.http.post<AdxQueryResponse>('https://localhost:7074/api/AdxDataQuery/GetData', postRequest)
      .subscribe((response: AdxQueryResponse) => {
        console.log(response);

        // Assuming response.data is an array of objects with string keys
        if (response.data && Array.isArray(response.data)) {
          // Handle the response data here
         // this.plotDataSignal.set(response.data);
        }
      });
  }

  
  reloadData_local(){
    const points: any[] = [];

    const datatime = Date.now();
    for (let i = 0; i < this.numOfCharts; i++) {
      const temp = this.generateTimeSeriesData(datatime);
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

  private generateTimeSeriesData(datatime: number): DataPoint[] {
    // Simulate reloading data for the first chart
    var count = 100;

    const randomData: DataPoint[] = []; 

    for (let i = 0; i < count; i++) {
      const randomX = datatime - (count - i) * 1000000;

      const randomY = Math.random() * (Math.random() * 10); // Random y between 0 and 100
      randomData.push({ x: randomX, y: randomY });
    }

    return randomData;
  }

}
