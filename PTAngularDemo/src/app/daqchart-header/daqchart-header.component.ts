import { Component, Input } from '@angular/core';
import { ChartProp } from '../plot/plot.component';

@Component({
  selector: 'app-daqchart-header',
  templateUrl: './daqchart-header.component.html',
  styleUrl: './daqchart-header.component.css'
})
export class DaqchartHeaderComponent {
  @Input() chartProp: ChartProp | undefined;


  zoomIn() {
    const s =  this.chartProp;

  }
}
