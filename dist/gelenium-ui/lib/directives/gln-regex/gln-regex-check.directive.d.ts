import { OnChanges, SimpleChanges } from '@angular/core';
import { NgControl, ValidatorFn } from '@angular/forms';
import { GlnNodeInternalValidator } from './gln-node-internal-validator.interface';
import { GlnRegexCheck } from './gln-regex-check.interface';
import * as i0 from "@angular/core";
export declare function regexCheckValidator(regExpVal: RegExp, name: string): ValidatorFn;
export declare class GlnRegexCheckDirective implements OnChanges {
    private control;
    private nodeInternalValidator;
    glnRegexCheck: string | GlnRegexCheck | null;
    constructor(control: NgControl, nodeInternalValidator: GlnNodeInternalValidator | null);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnRegexCheckDirective, [null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnRegexCheckDirective, "[glnRegexCheck]", ["glnRegexCheck"], { "glnRegexCheck": "glnRegexCheck"; }, {}, never, never, false>;
}
