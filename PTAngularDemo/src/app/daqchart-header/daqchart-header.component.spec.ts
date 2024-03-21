import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaqchartHeaderComponent } from './daqchart-header.component';

describe('DaqchartHeaderComponent', () => {
  let component: DaqchartHeaderComponent;
  let fixture: ComponentFixture<DaqchartHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaqchartHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaqchartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
