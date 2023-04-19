import { TestBed } from '@angular/core/testing';

import { GlnSnackbar2Service } from './gln-snackbar2.service';

describe('GlnSnackbar2Service', () => {
  let service: GlnSnackbar2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlnSnackbar2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
