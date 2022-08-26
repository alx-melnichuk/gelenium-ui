import { ChangeDetectorRef, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { GlnOptionGroup } from '../gln-option/gln-option-group.interface';
import * as i0 from "@angular/core";
export declare class GlnOptionGroupComponent implements OnChanges, OnInit, GlnOptionGroup {
    hostRef: ElementRef<HTMLElement>;
    private renderer;
    private changeDetectorRef;
    id: string;
    isDisabled: string | boolean | null | undefined;
    label: string | null | undefined;
    disabled: boolean | null | undefined;
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    /** Check or uncheck disabled. */
    setDisabled(value: boolean | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnOptionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnOptionGroupComponent, "gln-option-group", ["glnOptionGroup"], { "id": "id"; "isDisabled": "isDisabled"; "label": "label"; }, {}, never, ["*", "gln-option, ng-container"], false>;
}
