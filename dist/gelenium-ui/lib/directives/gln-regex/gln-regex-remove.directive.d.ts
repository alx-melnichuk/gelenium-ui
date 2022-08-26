import { OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * @description
 *
 * The GlnRegexremove directive, when changed, removes those values that match the specified
 * regular expression.
 * The regular expression must contain those characters that should not be present in the resulting
 * string.
 * In other words, if for a character the regex check returned true, then this character is not
 * included in the resulting string.
 * This allows the required business logic to be implemented without displaying an error.
 *
 * For example:
 * For the expression "/[^\d]/gm", all non-numeric values will be removed.
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexRemove="/[^\d]/gm">
 *
 * For the expression "/[^A-Za-z]/gm", all non-alphabetic values will be removed.
 * 2. <input type="text" formControlName="name2" glnRegexRemove="/[^A-Za-z]/gm">
 *
 * For the expression "/[^\dA-Za-z]/gm", all non-numeric and non-alphabetic values will be removed.
 * 3. <input type="text" formControlName="name2" glnRegexRemove="/[^\dA-Za-z]/gm">
 */
export declare class GlnRegexRemoveDirective implements OnChanges {
    private control;
    glnRegexRemove: string | null;
    private regex;
    constructor(control: NgControl);
    ngOnChanges(changes: SimpleChanges): void;
    doInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnRegexRemoveDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnRegexRemoveDirective, "[glnRegexRemove]", ["glnRegexRemove"], { "glnRegexRemove": "glnRegexRemove"; }, {}, never, never, false>;
}
