import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
export declare const GLN_NODE_INTERNAL_VALIDATOR: InjectionToken<GlnNodeInternalValidator>;
export interface GlnNodeInternalValidator {
    addValidators(validators: ValidatorFn | ValidatorFn[]): void;
    addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
}
