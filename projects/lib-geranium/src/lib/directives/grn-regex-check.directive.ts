import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

import { GrnRegex, GrnRegexUtil } from './grn-regex.interface';
import { RegexUtil } from './regex.util';

export function regexCheckValidator(regExpVal: RegExp, name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = !control || !control.value || regExpVal.test(control.value);
    return result ? null : { [name]: { value: control.value } };
  };
}

const REGEX_CHECK_NAME = 'regexpCheck';

@Directive({
  selector: '[grnRegexCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GrnRegexCheckDirective, multi: true }],
})
export class GrnRegexCheckDirective implements OnChanges, Validator {
  @Input()
  public grnRegexCheck: string | GrnRegex | null = null;

  private name = REGEX_CHECK_NAME;
  private regex: RegExp | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexCheck) {
      const grnRegex: GrnRegex | null = GrnRegexUtil.create(this.grnRegexCheck);
      this.name = grnRegex?.name || REGEX_CHECK_NAME;
      this.regex = RegexUtil.create(grnRegex?.regex || null);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.regex ? regexCheckValidator(this.regex, this.name)(control) : null;
  }
}
