import { TestBed } from '@angular/core/testing';

import { GlnSnackbarService } from './gln-snackbar.service';

describe('GlnSnackbarService', () => {
  let service: GlnSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlnSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
