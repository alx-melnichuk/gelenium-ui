import { AfterContentInit, AfterViewInit, ElementRef, QueryList } from '@angular/core';
import { GlnAutoFocuseDirective } from './gln-auto-focuse.directive';
import * as i0 from "@angular/core";
export declare class GlnAutoFocuseOwnerDirective implements AfterContentInit, AfterViewInit {
    hostRef: ElementRef<HTMLElement>;
    list: QueryList<GlnAutoFocuseDirective>;
    constructor(hostRef: ElementRef<HTMLElement>);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnAutoFocuseOwnerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnAutoFocuseOwnerDirective, "[glnAutoFocuseOwner]", ["glnAutoFocuseOwner"], {}, {}, ["list"], never, false>;
}
