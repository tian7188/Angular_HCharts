import { TestBed } from '@angular/core/testing';

import { ZoomSelectionService } from './zoom-selection.service';

describe('ZoomSelectionService', () => {
  let service: ZoomSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
