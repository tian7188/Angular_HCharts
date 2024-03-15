import { Injectable, inject, signal } from '@angular/core';
import { DataPoint, AdxQueryRequestModel, AdxQueryResponse, FileLookupType, LoggingFileType } from '../AdxQueryRequestModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DaqDataService {
 
  http = inject(HttpClient);

  plotNamesSignal = signal<string[]>([]);
  plotDataSignal = signal<DataPoint[]>([]);

  numOfCharts: number = 5;
  pointCount = 3000;
  constructor() { }

  //load data from daq-api
  reloadData(holeId: number) {
    const points: any[] = [];

    const postRequest: AdxQueryRequestModel = {
      holeLookupKey: {
        holeId: holeId,
        fileConfigLookupKey: {
          loggingFileType: LoggingFileType.Instrumentation,
          secondaryType: FileLookupType.DrillId,
          secondaryValue: 96
        }
      },
      queryParams: {
        interval: 10,
        isDepthAxis: false,
        numOfPoints: 3000
      }
    };


    this.http.post<AdxQueryResponse>('https://localhost:7074/api/AdxDataQuery/GetData', postRequest)
      .subscribe((response: AdxQueryResponse) => {
        console.log(response);

        // Parse response and get arrays for names and data
        const { names, dataList } = this.parseResponse(response);

        // Set all data points to plotDataSignal
        this.plotNamesSignal.set(names);
        this.plotDataSignal.set(dataList);
      },
        (error) => {
          if (error.status === 404) {
            console.log('Not found error:', error);
            // Handle the "Not found" error here

            this.reloadData_local(1);

          } else {
            console.error('Server error:', error);
            // Handle other errors here
          }
        });
  }

  parseResponse(response: AdxQueryResponse): { names: string[], dataList: any[] } {
    const names: string[] = [];
    const dataList: any[] = [];

    // Assuming response.data is an array of objects with string keys
    if (response.data && Array.isArray(response.data)) {
      // Iterate over each data object
      response.data.forEach((data: any) => {
        // Iterate over each property of the data object
        Object.keys(data).forEach(key => {
          // Skip 'Time' property
          if (key !== 'Time' && !names.includes(key)) {
            names.push(key);
            dataList.push([{ x: data.Time, y: data[key] }]);
          } else if (key !== 'Time') {
            // Find the index of the property in names array
            const index = names.indexOf(key);
            // If the property already exists in names array, push data point to its corresponding data array
            dataList[index].push({ x: data.Time, y: data[key] });
          }
        });
      });
    }

    return { names, dataList };
  }

  reloadData_local(count: number = 200){
    const points: any[] = [];
    const names = ['Curve 1', 'Curve 2', 'Curve 3', 'Curve 4', 'Curve 5'];

    const datatime = Date.now();
    for (let i = 0; i < this.numOfCharts; i++) {
      const temp = this.generateTimeSeriesData(datatime, count);
      points.push(temp);
    }


    this.plotNamesSignal.set(names);
    this.plotDataSignal.set(points);
  }


  private generateTimeSeriesData(datatime: number, count: number): DataPoint[] {
    // Simulate reloading data for the first chart
    const randomData: DataPoint[] = []; 

    for (let i = 0; i < count; i++) {
      const randomX = datatime - (count - i) * 500;

      const randomY = Math.random() * (Math.random() * 10); // Random y between 0 and 100
      randomData.push({ x: randomX, y: randomY });
    }

    return randomData;
  }
}

