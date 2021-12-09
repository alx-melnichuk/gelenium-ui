import { Directive, Inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { GRN_NODE_INTERNAL_VALIDATOR, GrnNodeInternalValidator } from './grn-node-internal-validator.interface';
import { GrnRegexCheck, GrnRegexCheckUtil } from './grn-regex-check.interface';
import { RegexUtil } from './regex.util';

export function regexCheckValidator(regExpVal: RegExp, name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = !control || !control.value || regExpVal.test(control.value);
    return result ? null : { [name]: { value: control.value } };
  };
}

@Directive({
  selector: '[grnRegexCheck]',
  exportAs: 'grnRegexCheck',
})
export class GrnRegexCheckDirective implements OnChanges {
  @Input()
  public grnRegexCheck: string | GrnRegexCheck | null = null;

  constructor(
    private control: NgControl,
    @Optional() @Inject(GRN_NODE_INTERNAL_VALIDATOR) private nodeInternalValidator: GrnNodeInternalValidator | null
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexCheck && this.control && this.control.control) {
      const regexCheck: GrnRegexCheck = GrnRegexCheckUtil.create(this.grnRegexCheck) || {};
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
