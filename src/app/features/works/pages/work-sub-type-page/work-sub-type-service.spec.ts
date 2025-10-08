import { TestBed } from '@angular/core/testing';

import { WorkSubTypeService } from './work-sub-type-service';

describe('WorkSubTypeService', () => {
  let service: WorkSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
