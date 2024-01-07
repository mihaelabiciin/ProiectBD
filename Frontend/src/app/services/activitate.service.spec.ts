import { TestBed } from '@angular/core/testing';

import { ActivitateService } from './activitate.service';

describe('ActivitateService', () => {
  let service: ActivitateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
