import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GlnHintOrErrorComponent implements OnChanges {
    private renderer;
    private hostRef;
    text: string | null | undefined;
    isError: boolean | null | undefined;
    isFocused: boolean | null | undefined;
    isDisabled: boolean | null | undefined;
    constructor(renderer: Renderer2, hostRef: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnHintOrErrorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnHintOrErrorComponent, "gln-hint-or-error", ["glnHintOrError"], { "text": "text"; "isError": "isError"; "isFocused": "isFocused"; "isDisabled": "isDisabled"; }, {}, never, never, false>;
}
