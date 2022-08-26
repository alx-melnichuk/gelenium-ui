import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GlnFrameSizePaddingVerHorRes, GlnFrameSizePrepare } from './gln-frame-size-prepare.interface';
import * as i0 from "@angular/core";
export declare class GlnFrameSizeDirective implements OnChanges {
    hostRef: ElementRef<HTMLElement>;
    glnFrameSize: string | null | undefined;
    glnFrameSizeValue: number | null | undefined;
    glnFrameSizeLabelPd: number | null | undefined;
    glnFrameSizeElementRef: ElementRef<HTMLElement> | null | undefined;
    glnFrameSizePrepare: GlnFrameSizePrepare | null | undefined;
    glnFrameSizeModify: string | null | undefined;
    readonly glnFrameSizeChange: EventEmitter<GlnFrameSizePaddingVerHorRes>;
    frameSizeValue: number;
    lineHeight: number;
    elementRef: ElementRef<HTMLElement>;
    paddingVerHorRes: GlnFrameSizePaddingVerHorRes | null;
    private isBeforeInit;
    constructor(hostRef: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    updatePaddingVerAndHor(): void;
    private getLineHeight;
    private modifyBorderRadius;
    private modifyHorizontalPadding;
    private modifyverticalPadding;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnFrameSizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnFrameSizeDirective, "[glnFrameSize]", ["glnFrameSize"], { "glnFrameSize": "glnFrameSize"; "glnFrameSizeValue": "glnFrameSizeValue"; "glnFrameSizeLabelPd": "glnFrameSizeLabelPd"; "glnFrameSizeElementRef": "glnFrameSizeElementRef"; "glnFrameSizePrepare": "glnFrameSizePrepare"; "glnFrameSizeModify": "glnFrameSizeModify"; }, { "glnFrameSizeChange": "glnFrameSizeChange"; }, never, never, false>;
}
