import { TestBed } from '@angular/core/testing';

import { GsTableService } from './gs-table.service';

describe('GsTableService', () => {
  let service: GsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
