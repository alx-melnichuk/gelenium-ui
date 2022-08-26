import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { GlnButtonExterior } from '../../gln-button/gln-button-exterior.interface';
import { GlnFrameSizePaddingHorRes, GlnFrameSizePaddingVerRes, GlnFrameSizePrepare } from '../gln-frame-size/gln-frame-size-prepare.interface';
import * as i0 from "@angular/core";
export declare class GlnFrameExteriorButtonDirective implements OnChanges, GlnFrameSizePrepare {
    private hostRef;
    private renderer;
    glnFrameExteriorButton: string | null | undefined;
    glnFrameExteriorButtonElementRef: ElementRef<HTMLElement> | null | undefined;
    readonly glnFrameExteriorButtonChange: EventEmitter<void>;
    exterior: GlnButtonExterior | null;
    elementRef: ElementRef<HTMLElement>;
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    getExterior: () => string | null;
    getBorderRadius: (frameSizeValue: number, lineHeight: number) => string | null;
    getPaddingHor: (frameSizeValue: number, lineHeight: number) => GlnFrameSizePaddingHorRes | null;
    getPaddingVer: (frameSizeValue: number, lineHeight: number) => GlnFrameSizePaddingVerRes | null;
    private settingExterior;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnFrameExteriorButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnFrameExteriorButtonDirective, "[glnFrameExteriorButton]", ["glnFrameExteriorButton"], { "glnFrameExteriorButton": "glnFrameExteriorButton"; "glnFrameExteriorButtonElementRef": "glnFrameExteriorButtonElementRef"; }, { "glnFrameExteriorButtonChange": "glnFrameExteriorButtonChange"; }, never, never, false>;
}
