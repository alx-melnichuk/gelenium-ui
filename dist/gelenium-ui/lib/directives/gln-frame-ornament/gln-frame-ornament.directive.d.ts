import { AfterContentInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare const ATTR_ORN_LF = "glnfr-orn-lf";
export declare const ATTR_ORN_RG = "glnfr-orn-rg";
export declare class GlnFrameOrnamentDirective implements OnChanges, AfterContentInit {
    hostRef: ElementRef<HTMLElement>;
    private renderer;
    glnFrameOrnamentLfAlign: string | null | undefined;
    glnFrameOrnamentRgAlign: string | null | undefined;
    glnFrameOrnamentElementRef: ElementRef<HTMLElement> | null | undefined;
    glnFrameOrnamentPath: string | null | undefined;
    glnFrameOrnamentAfterContent: boolean | null | undefined;
    private isInit;
    private ornamentLf;
    private ornamentRg;
    private ornamentLfElemRef;
    private ornamentRgElemRef;
    private ornamentLfWidth;
    private ornamentRgWidth;
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    private initialSetting;
    private settingOrnamentLeft;
    private settingOrnamentRight;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnFrameOrnamentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnFrameOrnamentDirective, "[glnFrameOrnament]", ["glnFrameOrnament"], { "glnFrameOrnamentLfAlign": "glnFrameOrnamentLfAlign"; "glnFrameOrnamentRgAlign": "glnFrameOrnamentRgAlign"; "glnFrameOrnamentElementRef": "glnFrameOrnamentElementRef"; "glnFrameOrnamentPath": "glnFrameOrnamentPath"; "glnFrameOrnamentAfterContent": "glnFrameOrnamentAfterContent"; }, {}, never, never, false>;
}
