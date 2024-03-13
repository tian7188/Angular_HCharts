import { EventEmitter, Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ZoomSelectionService {
  zoomSelectionEvent = new EventEmitter<Highcharts.SelectEventObject>();
  sendZoomSelection(selection: Highcharts.SelectEventObject) {
    this.zoomSelectionEvent.emit(selection);
  }

  zoomEvent: EventEmitter<ZoomEventObject> = new EventEmitter<ZoomEventObject>();

  sendZoomEvent(event: ZoomEventObject) {
    this.zoomEvent.emit(event);
  }
}

export class ZoomEventObject {
  chartIndex: number = 0;
  xAxisMin: number = 0;
  xAxisMax: number = 0;
}
