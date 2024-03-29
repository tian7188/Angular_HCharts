import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaqChartComponent } from './daqchart.component';


describe('DAQChartComponent', () => {
  let component: DaqChartComponent;
  let fixture: ComponentFixture<DaqChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaqChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaqChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
