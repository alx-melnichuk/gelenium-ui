import { TestBed } from '@angular/core/testing';

import { GeleniumUiService } from './gelenium-ui.service';

describe('GeleniumUiService', () => {
  let service: GeleniumUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeleniumUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
