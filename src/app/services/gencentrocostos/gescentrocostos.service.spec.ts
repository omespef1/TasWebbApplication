import { TestBed } from '@angular/core/testing';

import { GescentrocostosService } from './gescentrocostos.service';

describe('GescentrocostosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GescentrocostosService = TestBed.get(GescentrocostosService);
    expect(service).toBeTruthy();
  });
});
