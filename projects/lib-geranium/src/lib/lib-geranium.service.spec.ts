import { TestBed } from '@angular/core/testing';

import { LibGeraniumService } from './lib-geranium.service';

describe('LibGeraniumService', () => {
  let service: LibGeraniumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibGeraniumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
