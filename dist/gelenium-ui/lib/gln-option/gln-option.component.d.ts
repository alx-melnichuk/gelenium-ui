import { ChangeDetectorRef, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlnOptionGroup } from './gln-option-group.interface';
import { GlnOptionParent } from './gln-option-parent.interface';
import * as i0 from "@angular/core";
export declare class GlnOptionComponent implements OnChanges, OnInit {
    hostRef: ElementRef<HTMLElement>;
    private renderer;
    private changeDetectorRef;
    parent: GlnOptionParent;
    group: GlnOptionGroup;
    id: string;
    isDisabled: string | boolean | null | undefined;
    value: unknown | null | undefined;
    contentRef: ElementRef<HTMLElement>;
    checkmark: boolean;
    disabled: boolean | null | undefined;
    formControl: FormControl;
    formGroup: FormGroup;
    marked: boolean;
    multiple: boolean;
    selected: boolean | null | undefined;
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, parent: GlnOptionParent, group: GlnOptionGroup);
    doClick(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    getTextContent(): string;
    getTrustHtml(): string;
    /** Check or uncheck "checkmark". */
    setCheckmark(value: boolean | null): void;
    /** Check or uncheck disabled. */
    setDisabled(value: boolean | null | undefined): void;
    /** Check or uncheck marking. */
    setMarked(value: boolean | null): void;
    /** Check or uncheck multiple. */
    setMultiple(value: boolean | null): void;
    /** Check or uncheck selected. */
    setSelected(value: boolean | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnOptionComponent, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnOptionComponent, "gln-option", ["glnOption"], { "id": "id"; "isDisabled": "isDisabled"; "value": "value"; }, {}, never, ["*"], false>;
}
