import { TestBed } from '@angular/core/testing';

import { DaqDataService } from './daq-data.service';

describe('DaqDataService', () => {
  let service: DaqDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaqDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
