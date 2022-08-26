import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GlnTouchRippleComponent implements OnChanges {
    private hostRef;
    private document;
    id: string;
    isCenter: string | null;
    private center;
    constructor(hostRef: ElementRef<HTMLElement>, document: Document);
    doMousedown(event: MouseEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    touchRipple(event: MouseEvent, isCenter?: boolean): void;
    private doRipple;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnTouchRippleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnTouchRippleComponent, "gln-touch-ripple", ["glnTouchRipple"], { "id": "id"; "isCenter": "isCenter"; }, {}, never, never, false>;
}
