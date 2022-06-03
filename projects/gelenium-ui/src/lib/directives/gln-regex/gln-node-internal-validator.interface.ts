import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export const GLN_NODE_INTERNAL_VALIDATOR = new InjectionToken<GlnNodeInternalValidator>('GLN_NODE_INTERNAL_VALIDATOR');

export interface GlnNodeInternalValidator {
  addValidators(validators: ValidatorFn | ValidatorFn[]): void;
  addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
}
