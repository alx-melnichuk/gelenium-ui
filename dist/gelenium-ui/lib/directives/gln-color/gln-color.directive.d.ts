import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GlnColorDirective implements OnChanges {
    private hostRef;
    glnColor: string | {
        [key: string]: string;
    } | null | undefined;
    glnColorElementRef: ElementRef<HTMLElement> | null | undefined;
    elementRef: ElementRef<HTMLElement>;
    private colorClearingMap;
    constructor(hostRef: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    private settingCssProoperties;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnColorDirective, "[glnColor]", ["glnColor"], { "glnColor": "glnColor"; "glnColorElementRef": "glnColorElementRef"; }, {}, never, never, false>;
}
