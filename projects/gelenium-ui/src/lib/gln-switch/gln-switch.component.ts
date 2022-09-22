import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  FormControl,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { take } from 'rxjs/operators';

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

const CSS_PROP_PARENT_FONT_SIZE = '--glnsw-pr-font-size';
const CSS_ATTR_HOOK_INIT = 'hkInit';

let uniqueIdCounter = 0;

// export const GLN_INPUT_CONFIG = new InjectionToken<GlnFrameConfig>('GLN_INPUT_CONFIG');

@Component({
  selector: 'gln-switch',
  exportAs: 'glnSwitch',
  templateUrl: './gln-switch.component.html',
  styleUrls: ['./gln-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => GlnSwitchComponent), multi: true },
    { provide: GLN_NODE_INTERNAL_VALIDATOR, useExisting: GlnSwitchComponent },
  ],
})
export class GlnSwitchComponent implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator {
  @Input()
  public id = `glnsw-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;

  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;

  @Input()
  public label: string | null | undefined;

  @Input()
  public tabIndex = 0;

  @Output()
  readonly change: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('wrapElement', { read: ElementRef, static: true })
  public wrapElementRef!: ElementRef<HTMLElement>;

  public disabled: boolean | null = null; // Binding attribute "isDisabled".

  public formControl: FormControl = new FormControl({ value: null, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });

  public inputId = `${this.id}-input`;
  public noAnimation: boolean | null = null;
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
    // Add the CSS_ATTR_HOOK_INIT attribute, which disables the animation on initialization.
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HOOK_INIT, '');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabledState(!!disabled);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimation == null)) {
      const noAnimation = this.isNoAnimation != null ? BooleanUtil.init(this.isNoAnimation) : false; // !!this.currConfig?.isNoAnimation;
      this.settingNoAnimation(this.renderer, this.hostRef, (this.noAnimation = !!noAnimation));
    }
    if (changes['isReadOnly']) {
      this.readOnly = BooleanUtil.init(this.isReadOnly);
    }
    if (changes['isRequired']) {
      this.required = BooleanUtil.init(this.isRequired);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    const parentFontSize = this.getFontSize(HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement));
    if (parentFontSize > 0) {
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_PARENT_FONT_SIZE, NumberUtil.str(parentFontSize)?.concat('px'));
    }
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', !this.disabled ? '' + this.tabIndex : null);

    if (this.noAnimation == null) {
      const noAnimation = this.isNoAnimation != null ? this.isNoAnimation : false; // !!this.currConfig?.isNoAnimation;
      this.settingNoAnimation(this.renderer, this.hostRef, (this.noAnimation = !!noAnimation));
    }
  }

  public ngAfterViewInit(): void {
    // The ngZone will become stable when there are no more render tasks. This means that our component has already been rendered.
    // And we can remove the CSS_ATTR_HOOK_INIT attribute, which blocks the animation during initialization.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, CSS_ATTR_HOOK_INIT, null);
    });
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    this.formControl.setValue(!!value, { emitEvent: false });
    this.setStateChecked(!!value, this.hostRef);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
      if (isDisabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!isDisabled && this.formControl.disabled) {
        this.formControl.enable();
      }
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);

      this.changeDetectorRef.markForCheck();
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Validator - start **

  public validate(control: AbstractControl): ValidationErrors | null {
    return !control ? null : this.formControl.errors;
  }

  // ** Validator - finish **

  // ** GlnNodeInternalValidator - start **

  public addValidators(validators: ValidatorFn | ValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  public addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void {
    if (validators != null) {
      this.formControl.addAsyncValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  // ** GlnNodeInternalValidator - finish **

  // ** Public API **

  // public getBoolean(value: string | boolean | null | undefined): boolean | null {
  //   return BooleanUtil.init(value);
  // }

  /** Toggles the state of the switch. */
  public toggle(): void {
    const newValue = !this.formControl.value;
    this.formControl.setValue(newValue);
    this.setStateChecked(newValue, this.hostRef);
    this.onChange(newValue);
    this.change.emit(newValue);
  }

  // ** Private API **

  private setStateChecked(checked: boolean, elementRef: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(this.renderer, elementRef, 'gln-checked', checked);
  }

  private getFontSize(elem: ElementRef<HTMLElement> | null): number {
    let result = 0;
    if (elem && elem.nativeElement) {
      // Get the line height from the style set.
      const fontSizePx = getComputedStyle(elem.nativeElement).getPropertyValue('font-size');
      result = Number(fontSizePx.replace('px', ''));
    }
    return result;
  }

  private settingNoAnimation(renderer: Renderer2, elem: ElementRef<HTMLElement>, isNoAnimation: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', isNoAnimation);
    HtmlElemUtil.setAttr(renderer, elem, 'noAnm', isNoAnimation ? '' : null);
  }
}
