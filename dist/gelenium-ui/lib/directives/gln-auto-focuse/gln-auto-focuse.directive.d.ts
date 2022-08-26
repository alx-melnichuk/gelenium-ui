import { AfterViewInit, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class GlnAutoFocuseDirective implements OnChanges, AfterViewInit {
    hostRef: ElementRef<HTMLElement>;
    private renderer;
    glnAutoFocuse: string | boolean | null;
    private autoFocuse;
    get isAutoFocuse(): boolean;
    set isAutoFocuse(value: boolean);
    private hasOwner;
    get isHasOwner(): boolean;
    set isHasOwner(value: boolean);
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    focuseElement(): void;
    setIsHasOwner(isHasOwner: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnAutoFocuseDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnAutoFocuseDirective, "[glnAutoFocuse]", ["glnAutoFocuse"], { "glnAutoFocuse": "glnAutoFocuse"; }, {}, never, never, false>;
}
