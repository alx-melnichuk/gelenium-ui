import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function regexpCheckValidator(regExpVal: RegExp, name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = regExpVal.test(control.value);
    return !result ? { [name]: { value: control.value } } : null;
  };
}

export interface GrnRegexpCheck {
  name: string;
  regexp: string;
}

const NAME = 'regexpCheck';

@Directive({
  selector: 'input[grnRegexpCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GrnRegexpCheckDirective, multi: true }],
})
export class GrnRegexpCheckDirective implements OnChanges, Validator {
  @Input()
  public grnRegexpCheck: string | GrnRegexpCheck | null = null;

  private name = NAME;
  private regExp: RegExp | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.grnRegexpCheck) {
      this.regExp = null;
      let regExpStr = '';
      if (this.grnRegexpCheck != null) {
        const typeValue = typeof this.grnRegexpCheck;
        if (typeValue === 'object') {
          const valueObj: GrnRegexpCheck = this.grnRegexpCheck as GrnRegexpCheck;
          this.name = valueObj.name ? valueObj.name : NAME;
          regExpStr = valueObj.regexp;
        } else if (typeValue === 'string') {
          regExpStr = this.grnRegexpCheck as string;
        }
        if (regExpStr) {
          this.regExp = new RegExp(regExpStr, 'i');
        }
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.regExp ? regexpCheckValidator(this.regExp, this.name)(control) : null;
  }
}
