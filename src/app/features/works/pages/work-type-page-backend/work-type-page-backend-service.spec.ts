import { TestBed } from '@angular/core/testing';

import { WorkTypePageBackendService } from './work-type-page-backend-service';

describe('WorkTypePageBackendService', () => {
  let service: WorkTypePageBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTypePageBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
