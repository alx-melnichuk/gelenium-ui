import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
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
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { GlnNodeInternalValidator, GLN_NODE_INTERNAL_VALIDATOR } from '../directives/gln-regex/gln-node-internal-validator.interface';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { GlnBaseControl } from '../_interface/gln-base-control';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnSwitchConfig } from './gln-switch.interface';

const CSS_PROP_PARENT_FONT_SIZE = '--glnsw-pr-font-size';

let uniqueIdCounter = 0;

export const GLN_SWITCH_CONFIG = new InjectionToken<GlnSwitchConfig>('GLN_SWITCH_CONFIG');

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
export class GlnSwitchComponent
  extends GlnBaseControl
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, GlnNodeInternalValidator
{
  @Input()
  public override id = `glnsw-${uniqueIdCounter++}`; // Defined in GlnBaseControl.
  @Input()
  public config: GlnSwitchConfig | null | undefined;
  @Input()
  public isChecked: string | boolean | null | undefined; // Specifies the initial value of the element.
  @Input()
  public override isDisabled: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public override isNoAnimation: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public isNoRipple: string | boolean | null | undefined;
  @Input()
  public override isReadOnly: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public override isRequired: string | boolean | null | undefined; // Defined in GlnBaseControl.
  @Input()
  public override tabIndex = 0; // Defined in GlnBaseControl.

  @Output()
  readonly change: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public checked: boolean | null = null; // Binding attribute "isChecked".
  public currConfig: GlnSwitchConfig;
  public override disabled: boolean | null = null; // Binding attribute "isDisabled". // Defined in GlnBaseControl.
  public formControl: FormControl = new FormControl({ value: false, disabled: false }, []);
  public formGroup: FormGroup = new FormGroup({ textData: this.formControl });
  public idForInput = this.setIdForInput(this.id);
  public override noAnimation: boolean | null = null; // Binding attribute "isNoAnimation". // Defined in GlnBaseControl.
  public noRipple: boolean | null = null; // Binding attribute "isNoRipple".
  public override readOnly: boolean | null = null; // Binding attribute "isReadOnly". // Defined in GlnBaseControl.
  public override required: boolean | null = null; // Binding attribute "isRequired". // Defined in GlnBaseControl.

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_SWITCH_CONFIG) private rootConfig: GlnSwitchConfig | null
  ) {
    super(
      hostRef, // public hostRef: ElementRef<HTMLElement>,
      renderer, // protected renderer: Renderer2,
      ngZone // protected ngZone: NgZone
    );
    this.currConfig = this.rootConfig || this.createConfig();
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-switch', true);
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-control', true);
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    // In the GlnBaseControl.ngOnChanges(), the definition is made:
    // - this.disabled = BooleanUtil.init(this.isDisabled);
    // - this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    // - this.readOnly = BooleanUtil.init(this.isReadOnly);
    // - this.required = BooleanUtil.init(this.isRequired);
    super.ngOnChanges(changes);

    if (changes['id']) {
      this.idForInput = this.setIdForInput(this.id);
    }
    if (changes['isNoRipple'] || (changes['config'] && this.isNoRipple == null)) {
      this.noRipple = BooleanUtil.init(this.isNoRipple) || this.currConfig.isNoRipple || null;
    }
    if (changes['isRequired']) {
      this.prepareFormGroup(this.required);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    // Determine the font size of the parent element.
    const parentFontSize = this.getFontSize(HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement));
    if (parentFontSize > 0) {
      HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_PARENT_FONT_SIZE, NumberUtil.str(parentFontSize)?.concat('px'));
    }
    // If parameter AA is defined, then set the initial value.
    const isChecked = this.isChecked != null ? BooleanUtil.init(this.isChecked) : this.currConfig.isChecked;
    if (isChecked != null && isChecked !== this.formControl.value) {
      this.formControl.setValue(isChecked, { emitEvent: false });
      this.settingChecked(isChecked, this.hostRef, this.renderer);
    }
    if (this.noRipple == null) {
      this.noRipple = this.currConfig.isNoRipple || null;
    }
  }

  public override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  // ** ControlValueAccessor - start **

  public override writeValue(value: any): void {
    if (value !== this.formControl.value) {
      this.formControl.setValue(!!value, { emitEvent: false });
      this.settingChecked(!!value, this.hostRef, this.renderer);
      this.changeDetectorRef.markForCheck();
    }
  }

  public override setDisabledState(disabled: boolean): void {
    if (this.disabled !== disabled) {
      super.setDisabledState(disabled);
      if (disabled && !this.formControl.disabled) {
        this.formControl.disable();
      } else if (!disabled && this.formControl.disabled) {
        this.formControl.enable();
      }
    }
  }

  // ** ControlValueAccessor - finish **

  // ** Public API **

  public doClickByLabel(event: MouseEvent): void {
    if (!this.disabled && !this.readOnly && this.touchRipple) {
      this.touchRipple.touchRipple(event, true);
    }
  }

  /** Toggles the state of the switch. */
  public toggle(): void {
    if (!this.disabled && !this.readOnly) {
      const newValue = !this.formControl.value;
      this.formControl.setValue(newValue, { emitEvent: false });
      this.settingChecked(newValue, this.hostRef, this.renderer);
      this.onChange(newValue);
      this.change.emit(newValue);
      this.changeDetectorRef.markForCheck();
    }
  }

  // ** Protected API **

  protected createConfig(): GlnSwitchConfig {
    return {};
  }

  protected override getConfig(): GlnSwitchConfig {
    return { ...this.currConfig };
  }

  // ** Private API **

  private setIdForInput(id: string): string {
    return `${this.id}-input`;
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

  private settingChecked(isChecked: boolean, elem: ElementRef<HTMLElement>, renderer: Renderer2): void {
    this.checked = isChecked;
    HtmlElemUtil.setClass(renderer, elem, 'gln-checked', isChecked);
    HtmlElemUtil.setAttr(renderer, elem, 'chk', isChecked ? '' : null);
  }

  private prepareFormGroup(isRequired: boolean | null): void {
    this.formControl.clearValidators();
    const newValidator: ValidatorFn[] = [];
    if (isRequired) {
      newValidator.push(Validators.required);
    }
    this.formControl.setValidators(newValidator);
  }
}
