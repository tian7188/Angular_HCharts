import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAQChartComponent } from './daqchart.component';

describe('DAQChartComponent', () => {
  let component: DAQChartComponent;
  let fixture: ComponentFixture<DAQChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DAQChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DAQChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
