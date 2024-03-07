import { Injectable, inject, signal } from '@angular/core';
import { AdxQueryRequestModel, AdxQueryResponse, FileLookupType, LoggingFileType } from '../AdxQueryRequestModel';
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

    const postRequest: AdxQueryRequestModel = {
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
        numOfPoints: 1000
      }
    };


    this.http.post<AdxQueryResponse>('https://localhost:7074/api/AdxDataQuery/GetData', postRequest)
      .subscribe((response: AdxQueryResponse) => {
        console.log(response);
        
        // Parse response and get arrays for names and data
        const { names, dataList } = this.parseResponse(response);

        // Set all data points to plotDataSignal
        this.plotDataSignal.set(dataList);
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



  parseResponse2(response: AdxQueryResponse): any[] {
    const dataList: any[] = [];

    // Assuming response.data is an array of objects with string keys
    if (response.data && Array.isArray(response.data)) {
      // Inside the handleResponse method
      const engineTorqueData: DataPoint[] = [];
      const engineSpeedData: DataPoint[] = [];
      const mudPumpDischargeData: DataPoint[] = [];
      const flowRateData: DataPoint[] = [];
      const topDriveTorqueData: DataPoint[] = [];
      const topDriveRPMData: DataPoint[] = [];
      const compressorFlowRateData: DataPoint[] = [];
      const hookLoadData: DataPoint[] = [];
      const rateOfPenetrationData: DataPoint[] = [];

      // Collect data points for each property
      response.data.forEach((data: any) => {
        engineTorqueData.push({
          x: data.Time,
          y: data.EngineTorque
        });
        engineSpeedData.push({
          x: data.Time,
          y: data.EngineSpeed
        });
        mudPumpDischargeData.push({
          x: data.Time,
          y: data.MudPumpDischarge
        });
        flowRateData.push({
          x: data.Time,
          y: data.FlowRate
        });
        topDriveTorqueData.push({
          x: data.Time,
          y: data.TopDriveTorque
        });
        topDriveRPMData.push({
          x: data.Time,
          y: data.TopDriveRPM
        });
        compressorFlowRateData.push({
          x: data.Time,
          y: data.CompressorFlowRate
        });
        hookLoadData.push({
          x: data.Time,
          y: data.HookLoad
        });
        rateOfPenetrationData.push({
          x: data.Time,
          y: data.RateOfPenetration
        });
      });

      // Add each data array to the dataList
      dataList.push(
        engineTorqueData,
        engineSpeedData,
        mudPumpDischargeData,
        flowRateData,
        topDriveTorqueData,
        topDriveRPMData,
        compressorFlowRateData,
        hookLoadData,
        rateOfPenetrationData
      );
    }

    return dataList;

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

function dsfd(response: AdxQueryResponse) {
    throw new Error('Function not implemented.');
}
