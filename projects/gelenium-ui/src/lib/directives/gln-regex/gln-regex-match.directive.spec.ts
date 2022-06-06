import { FormControl, NgControl } from '@angular/forms';
import { GlnRegexMatchDirective } from './gln-regex-match.directive';

const control = new FormControl() as unknown as NgControl;

describe('GlnRegexMatchDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnRegexMatchDirective(control);
    expect(directive).toBeTruthy();
  });
});
