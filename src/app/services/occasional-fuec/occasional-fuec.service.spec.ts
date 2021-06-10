import { TestBed } from '@angular/core/testing';

import { OccasionalFuecService } from './occasional-fuec.service';

describe('OccasionalFuecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccasionalFuecService = TestBed.get(OccasionalFuecService);
    expect(service).toBeTruthy();
  });
});
