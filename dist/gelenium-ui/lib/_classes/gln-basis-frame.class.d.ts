import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class GlnBasisFrame implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor {
    prefix: string;
    hostRef: ElementRef<HTMLElement>;
    protected renderer: Renderer2;
    protected changeDetectorRef: ChangeDetectorRef;
    protected ngZone: NgZone;
    id: string;
    isDisabled: string | boolean | null | undefined;
    isError: string | boolean | null | undefined;
    isLabelShrink: string | boolean | null | undefined;
    isNoAnimation: string | boolean | null | undefined;
    isNoLabel: string | boolean | null | undefined;
    isReadOnly: string | boolean | null | undefined;
    isRequired: string | boolean | null | undefined;
    isValueInit: string | boolean | null | undefined;
    readonly writeValueInit: EventEmitter<() => void>;
    disabled: boolean | null;
    error: boolean | null;
    isWriteValueInit: boolean | null;
    labelShrink: boolean | null;
    noAnimation: boolean | null;
    noLabel: boolean | null;
    readOnly: boolean | null;
    required: boolean | null;
    valueInit: boolean | null;
    constructor(uniqueIdCounter: number, prefix: string, hostRef: ElementRef<HTMLElement>, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    onChange: (val: unknown) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    markForCheck(): void;
    getBoolean(value: string | boolean | null | undefined): boolean | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnBasisFrame, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GlnBasisFrame, never, never, { "id": "id"; "isDisabled": "isDisabled"; "isError": "isError"; "isLabelShrink": "isLabelShrink"; "isNoAnimation": "isNoAnimation"; "isNoLabel": "isNoLabel"; "isReadOnly": "isReadOnly"; "isRequired": "isRequired"; "isValueInit": "isValueInit"; }, { "writeValueInit": "writeValueInit"; }, never, never, false>;
}
