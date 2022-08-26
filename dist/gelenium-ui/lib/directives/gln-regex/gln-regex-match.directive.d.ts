import { OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * @description
 *
 * The "GlnRegexMatch" directive allows you to enter only those values that match the specified
 * regular expression. If the new value does not match the regular expression, then it is not
 * accepted.
 *
 * For example:
 * 1. <input type="text" [(ngModel)]="componentVaribale" name="name1" glnRegexMatch="^-?(\d+)$">
 *  [glnRegexMatch]="'^-?(\\d+)$'"
 *  glnRegexMatch="/^-?(\d+)$/i"
 *  [glnRegexMatch]="'/^-?(\\d+)$/i'"
 */
export declare class GlnRegexMatchDirective implements OnChanges {
    private control;
    glnRegexMatch: string | null;
    private regex;
    private initialValue;
    constructor(control: NgControl);
    ngOnChanges(changes: SimpleChanges): void;
    doBeforeinput(): void;
    doInput(event: InputEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnRegexMatchDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnRegexMatchDirective, "[glnRegexMatch]", ["glnRegexMatch"], { "glnRegexMatch": "glnRegexMatch"; }, {}, never, never, false>;
}
