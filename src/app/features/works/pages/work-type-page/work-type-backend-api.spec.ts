import { TestBed } from '@angular/core/testing';

import { WorkTypeBackendApi } from './work-type-backend-api';

describe('WorkTypeBackendApi', () => {
  let service: WorkTypeBackendApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTypeBackendApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
