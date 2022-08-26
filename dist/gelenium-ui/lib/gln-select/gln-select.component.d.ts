import { CdkConnectedOverlay, ConnectedPosition, ScrollStrategy } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, NgZone, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { GlnFrameSizePaddingVerHorRes } from '../directives/gln-frame-size/gln-frame-size-prepare.interface';
import { GlnBasisFrame } from '../_classes/gln-basis-frame.class';
import { GlnOptionParent } from '../gln-option/gln-option-parent.interface';
import { GlnOptionComponent } from '../gln-option/gln-option.component';
import { GlnSelectConfig } from './gln-select-config.interface';
import { GlnSelectionChange } from './gln-selection-change.interface';
import { GlnSelectTriggerDirective } from './gln-select-trigger.directive';
import * as i0 from "@angular/core";
export declare const GLN_SELECT_CONFIG: InjectionToken<GlnSelectConfig>;
export declare class GlnSelectComponent extends GlnBasisFrame implements OnChanges, OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor, Validator, GlnOptionParent {
    private platformId;
    private rootConfig;
    private scrollStrategyFactory;
    config: GlnSelectConfig | null | undefined;
    exterior: string | null | undefined;
    frameSize: string | null | undefined;
    helperText: string | null | undefined;
    isCheckmark: string | boolean | null | undefined;
    isMultiple: string | boolean | null | undefined;
    isNoIcon: string | boolean | null | undefined;
    isNoRipple: string | boolean | null | undefined;
    label: string | null | undefined;
    maxLength: number | null | undefined;
    minLength: number | null | undefined;
    ornamLfAlign: string | null | undefined;
    ornamRgAlign: string | null | undefined;
    panelClass: string | string[] | Set<string> | {
        [key: string]: unknown;
    };
    position: string | null | undefined;
    visibleSize: number;
    tabIndex: number;
    wdFull: string | null | undefined;
    get value(): unknown | unknown[] | null;
    set value(newValue: unknown | unknown[] | null);
    private valueData;
    readonly focused: EventEmitter<void>;
    readonly blured: EventEmitter<void>;
    readonly opened: EventEmitter<void>;
    readonly closed: EventEmitter<void>;
    readonly selected: EventEmitter<{
        value: unknown | null;
        values: unknown[];
        change: GlnSelectionChange<GlnOptionComponent>;
    }>;
    /** Overlay panel with its own parameters. */
    protected connectedOverlay: CdkConnectedOverlay;
    customTrigger: GlnSelectTriggerDirective | undefined;
    frameRef: ElementRef<HTMLElement>;
    /** A trigger that opens a dropdown list of options. */
    triggerRef: ElementRef<HTMLElement>;
    /** List of possible options. */
    optionList: QueryList<GlnOptionComponent>;
    get options(): GlnOptionComponent[];
    set options(value: GlnOptionComponent[]);
    backdropClassVal: string | null;
    checkmark: boolean | null;
    currConfig: GlnSelectConfig | null;
    errors: ValidationErrors | null;
    formControl: FormControl;
    formGroup: FormGroup;
    frameSizeDefault: number;
    hasPanelAnimation: boolean;
    isFocused: boolean;
    isFilled: boolean;
    isPanelOpen: boolean;
    multiple: boolean | null;
    noIcon: boolean | null;
    noRipple: boolean | null;
    overlayPanelClass: string | string[];
    panelClassList: string | string[] | Set<string> | {
        [key: string]: any;
    } | undefined;
    positionList: ConnectedPosition[];
    selectedOptions: GlnOptionComponent[];
    /** Strategy for handling scrolling when the selection panel is open. */
    scrollStrategy: ScrollStrategy;
    /** The position and dimensions for the trigger's bounding box. */
    triggerRect: DOMRect | null;
    visibleSizeVal: number | null;
    private isFocusAttrOnFrame;
    private markedOption;
    private maxWidth;
    /** Saving the font size of the trigger element. */
    private triggerFontSize;
    /** Saving the frame size of the trigger element. Defines BorderRadius. */
    private triggerFrameSize;
    constructor(hostRef: ElementRef<HTMLElement>, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, platformId: Object, rootConfig: GlnSelectConfig | null, scrollStrategyFactory: any, ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(control: AbstractControl): ValidationErrors | null;
    optionSelection(optionItem: GlnOptionComponent): void;
    trackByOption(index: number, item: GlnOptionComponent): string;
    /** Determine the value of the css variable "frame size". */
    frameSizeChange(event: GlnFrameSizePaddingVerHorRes): void;
    getPanelClass(list: string | string[] | Set<string> | {
        [key: string]: any;
    } | undefined): string | string[] | Set<string> | {
        [key: string]: any;
    };
    isEmpty(): boolean;
    focus(): void;
    doFocus(): void;
    /** Calls the touch callback only when the panel is closed.
     * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
     */
    doBlur(): void;
    /** Occurs when a mouse click event occurs outside of the options list pane. */
    backdropClick(): void;
    /** Occurs when the panel receives input focus. */
    doFocusOnPanel(): void;
    /** Open or close the overlay panel. */
    toggle(): void;
    /** Open overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the main element. */
    close(): void;
    /** Callback when the overlay panel is attached. */
    attach(): void;
    /** Handles all keypress events for the component's panel. */
    frameKeydown(event: KeyboardEvent): void;
    /** Processing the option selected by the user. */
    selectionOptionElement(addOption: GlnOptionComponent | null): void;
    addOption(option: GlnOptionComponent | null): void;
    deleteOption(option: GlnOptionComponent | null): void;
    private updateSelectedOptions;
    private mergeOptions;
    private getHeight;
    /** Define the "TranslateY" parameter to correctly open or close. */
    private getTranslateY;
    /** Update the data value, the sign of fullness and perform validation. */
    private updateValueDataAndIsFilledAndValidity;
    /** Move the marked option to the next or previous one. */
    private movingMarkedOption;
    /** Get the height of the option. */
    private getOptionHeigth;
    private getPosition;
    private getPositionList;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlnSelectComponent, [null, null, null, null, { optional: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlnSelectComponent, "gln-select", ["glnSelect"], { "config": "config"; "exterior": "exterior"; "frameSize": "frameSize"; "helperText": "helperText"; "isCheckmark": "isCheckmark"; "isMultiple": "isMultiple"; "isNoIcon": "isNoIcon"; "isNoRipple": "isNoRipple"; "label": "label"; "maxLength": "maxLength"; "minLength": "minLength"; "ornamLfAlign": "ornamLfAlign"; "ornamRgAlign": "ornamRgAlign"; "panelClass": "panelClass"; "position": "position"; "visibleSize": "visibleSize"; "tabIndex": "tabIndex"; "wdFull": "wdFull"; "value": "value"; }, { "focused": "focused"; "blured": "blured"; "opened": "opened"; "closed": "closed"; "selected": "selected"; }, ["customTrigger", "optionList"], ["[gln-orn-lf]", "[gln-orn-rg]", "gln-select-trigger", ":not(gln-select-trigger)"], false>;
}
