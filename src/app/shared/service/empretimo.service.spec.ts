import { TestBed } from '@angular/core/testing';

import { EmpretimoService } from './empretimo.service';

describe('EmpretimoService', () => {
  let service: EmpretimoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpretimoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
