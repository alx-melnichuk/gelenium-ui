import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export const GRN_NODE_INTERNAL_VALIDATOR = new InjectionToken<GrnNodeInternalValidator>('GRN_NODE_INTERNAL_VALIDATOR');

export interface GrnNodeInternalValidator {
  addValidators(validators: ValidatorFn | ValidatorFn[]): void;
  addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
}
