import { TestBed } from '@angular/core/testing';

import { OccasionalContractsService } from './occasional-contracts.service';

describe('OccasionalContractsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccasionalContractsService = TestBed.get(OccasionalContractsService);
    expect(service).toBeTruthy();
  });
});
