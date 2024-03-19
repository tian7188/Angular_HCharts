import { EventEmitter, Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ZoomSelectionService {
  zoomSelectionEvent = new EventEmitter<Highcharts.SelectEventObject>();
  zoomEvent: EventEmitter<ZoomEventObject> = new EventEmitter<ZoomEventObject>();
  crosshairPositionChange: EventEmitter<DAQPointerEventObject> = new EventEmitter<DAQPointerEventObject>();


  sendZoomSelection(selection: Highcharts.SelectEventObject) {
    this.zoomSelectionEvent.emit(selection);
  }

  sendZoomEvent(event: ZoomEventObject) {
    this.zoomEvent.emit(event);
  }

  sendCrosshairPositionChange(event: DAQPointerEventObject) {
    this.crosshairPositionChange.emit(event);
  }
}

export class ZoomEventObject {
  chartIndex: number = 0;
  xAxisMin: number = 0;
  xAxisMax: number = 0;
}

export interface DAQPointerEventObject {
  chartIndex: number,
  pointerEventObject: Highcharts.PointerEventObject | undefined
}
