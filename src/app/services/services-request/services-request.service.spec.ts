import { TestBed } from '@angular/core/testing';

import { ServicesRequestService } from './services-request.service';

describe('ServicesRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesRequestService = TestBed.get(ServicesRequestService);
    expect(service).toBeTruthy();
  });
});
