import { TestBed } from '@angular/core/testing';

import { OccasionalRoutesService } from './occasional-routes.service';

describe('OccasionalRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccasionalRoutesService = TestBed.get(OccasionalRoutesService);
    expect(service).toBeTruthy();
  });
});
