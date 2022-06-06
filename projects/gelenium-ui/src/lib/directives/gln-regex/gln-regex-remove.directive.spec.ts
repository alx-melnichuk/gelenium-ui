import { FormControl, NgControl } from '@angular/forms';
import { GlnRegexRemoveDirective } from './gln-regex-remove.directive';

const control = new FormControl() as unknown as NgControl;

describe('GlnRegexRemoveDirective', () => {
  it('should create an instance', () => {
    const directive = new GlnRegexRemoveDirective(control);
    expect(directive).toBeTruthy();
  });
});
