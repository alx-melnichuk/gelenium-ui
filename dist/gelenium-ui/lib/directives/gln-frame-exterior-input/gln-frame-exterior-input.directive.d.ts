import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GlnFrameSizePaddingHorRes, GlnFrameSizePaddingVerRes, GlnFrameSizePrepare } from '../gln-frame-size/gln-frame-size-prepare.interface';
import { GlnFrameExterior } from '../../gln-frame/gln-frame-exterior.interface';
import * as i0 from "@angular/core";
export declare class GlnFrameExteriorInputDirective implements OnChanges, GlnFrameSizePrepare {
    hostRef: ElementRef<HTMLElement>;
    glnFrameExteriorInput: string | null | undefined;
    glnFrameExteriorInputElementRef: ElementRef<HTMLElement> | null | undefined;
    readonly glnFrameExteriorInputChange: EventEmitter<void>;
    exterior: GlnFrameExterior;
    elementRef: ElementRef<HTMLElement>;
    constructor(hostRef: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    getExterior: () => string | null;
    getBorderRadius: (frameSizeValue: number, lineHeight: number) => string | null;
    getPaddingHor: (frameSizeValue: number, lineHeight: number) => GlnFrameSizePaddingHorRes | null;
    getPaddingVer: (frameSizeValue: number, lineHeight: number) => GlnFrameSizePaddingVerRes | null;
    translateY(exterior: GlnFrameExterior | null, frameSizeValue: number, lineHeight: number | null): number | null;
    translate2Y(exterior: GlnFrameExterior | null, frameSizeValue: number, lineHeight: number | null): number | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnFrameExteriorInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnFrameExteriorInputDirective, "[glnFrameExteriorInput]", ["glnFrameExteriorInput"], { "glnFrameExteriorInput": "glnFrameExteriorInput"; "glnFrameExteriorInputElementRef": "glnFrameExteriorInputElementRef"; }, { "glnFrameExteriorInputChange": "glnFrameExteriorInputChange"; }, never, never, false>;
}
