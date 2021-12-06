import { Directive, Host, Input, OnChanges, Optional, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, FormControl } from '@angular/forms';

import { GrnRegex, GrnRegexUtil, GrnRegisterValidation } from './grn-regex.interface';
import { RegexUtil } from './regex.util';

export function regexCheckValidator(regExpVal: RegExp, name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = !control || !control.value || regExpVal.test(control.value);
    return result ? null : { [name]: { value: control.value } };
  };
}

// export const regexCheckValidatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const result = !control || !control.value || regExpVal.test(control.value);
//   return result ? null : { [name]: { value: control.value } };
// };

const REGEX_CHECK_NAME = 'regexpCheck';

@Directive({
  selector: '[grnRegexCheck]',
  // providers: [{ provide: NG_VALIDATORS, useExisting: GrnRegexCheckDirective, multi: true }],
})
export class GrnRegexCheckDirective implements OnChanges /*, Validator*/ {
  @Input()
  public grnRegexCheck: string | GrnRegex | null = null;

  private name = REGEX_CHECK_NAME;
  private regex: RegExp | null = null;

  constructor(private control: NgControl, @Optional() private registerValidation: GrnRegisterValidation) {
    console.log('GrnRegexCheck();'); // TODO del;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('GrnRegexCheck.ngOnChanges();'); // TODO del;
    if (changes.grnRegexCheck) {
      const grnRegex: GrnRegex | null = GrnRegexUtil.create(this.grnRegexCheck);
      this.name = grnRegex?.name || REGEX_CHECK_NAME;
      this.regex = RegexUtil.create(grnRegex?.regex || null);
      if (this.control && this.control.control && !!this.regex) {
        const validatorFn: ValidatorFn = regexCheckValidator(this.regex, this.name);
        this.control.control.addValidators(validatorFn);
        if (this.registerValidation) {
          console.log('GrnRegexCheck.ngOnChanges(); this.registerValidation'); // TODO del;
          this.registerValidation.registerValidatorFn(validatorFn);
        }
      }
    }
  }

  /*validate(control: AbstractControl): ValidationErrors | null {
    // if (!!control && !!this.regex) {
    //   const formControl: FormControl = control as FormControl;
    //   const regexCheckValidatorFn: ValidatorFn = regexCheckValidator(this.regex, this.name);
    //   formControl.addValidators(regexCheckValidatorFn);
    // }
    return this.regex ? regexCheckValidator(this.regex, this.name)(control) : null;
  }*/
}
