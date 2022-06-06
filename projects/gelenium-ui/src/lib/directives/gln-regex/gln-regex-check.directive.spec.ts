import { FormControl, NgControl } from '@angular/forms';
import { GlnRegexCheckDirective } from './gln-regex-check.directive';

const control = new FormControl() as unknown as NgControl;

describe('GlnRegexCheckDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnRegexCheckDirective(control, null);
    expect(directive).toBeTruthy();
  });
});
