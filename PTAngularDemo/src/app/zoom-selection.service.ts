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
}
