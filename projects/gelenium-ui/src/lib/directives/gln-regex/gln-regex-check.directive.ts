import { Directive, Inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { GLN_NODE_INTERNAL_VALIDATOR, GlnNodeInternalValidator } from './gln-node-internal-validator.interface';
import { GlnRegexCheck, GlnRegexCheckUtil } from './gln-regex-check.interface';
import { RegexUtil } from './regex.util';

export function regexCheckValidator(regExpVal: RegExp, name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = !control || !control.value || regExpVal.test(control.value);
    return result ? null : { [name]: { value: control.value } };
  };
}

@Directive({
  selector: '[glnRegexCheck]',
  exportAs: 'glnRegexCheck',
})
export class GlnRegexCheckDirective implements OnChanges {
  @Input()
  public glnRegexCheck: string | GlnRegexCheck | null = null;

  constructor(
    private control: NgControl,
    @Optional() @Inject(GLN_NODE_INTERNAL_VALIDATOR) private nodeInternalValidator: GlnNodeInternalValidator | null
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.glnRegexCheck && this.control && this.control.control) {
      const regexCheck: GlnRegexCheck = GlnRegexCheckUtil.create(this.glnRegexCheck) || {};
      const list = Object.keys(regexCheck);
      for (const name of list) {
        const regex = RegexUtil.create(regexCheck[name]);
        if (!regex) continue;
        const validatorFn: ValidatorFn = regexCheckValidator(regex, name);
        this.control.control.addValidators(validatorFn);
        if (this.nodeInternalValidator != null) {
          this.nodeInternalValidator.addValidators(validatorFn);
        }
        this.control.control.updateValueAndValidity();
      }
    }
  }
}
