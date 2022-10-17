import { take } from 'rxjs/operators';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BooleanUtil } from '../_utils/boolean.util';

import { HtmlElemUtil } from '../_utils/html-elem.util';

@Directive()
export abstract class GlnBasisFrame implements OnChanges, OnInit, AfterContentInit, ControlValueAccessor {
  @Input()
  public id = '';
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isError: string | boolean | null | undefined;
  @Input()
  public isLabelShrink: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isNoLabel: string | boolean | null | undefined;
  @Input()
  public isReadOnly: string | boolean | null | undefined;
  @Input()
  public isRequired: string | boolean | null | undefined;
  @Input()
  public isValueInit: string | boolean | null | undefined;

  @Output()
  readonly writeValueInit: EventEmitter<() => void> = new EventEmitter();

  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public error: boolean | null = null; // Binding attribute "isError".
  public isWriteValueInit: boolean | null = null;
  public labelShrink: boolean | null = null; // Binding attribute "isLabelShrink".
  public noAnimation: boolean | null = null; // Binding attribute "isNoAnimation".
  public noLabel: boolean | null = null; // Binding attribute "isNoLabel".
  public readOnly: boolean | null = null; // Binding attribute "isReadOnly".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public valueInit: boolean | null = null; // Binding attribute "isValueInit".

  constructor(
    uniqueIdCounter: number,
    public prefix: string,
    public hostRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected ngZone: NgZone
  ) {
    this.id = `${prefix}-${uniqueIdCounter}`;
    if (!prefix) {
      console.warn('The "prefix" parameter is not defined, and therefore the "id" value is not unique.');
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabledState(!!this.disabled);
    }
    if (changes['isError']) {
      this.error = BooleanUtil.init(this.isError);
    }
    if (changes['isLabelShrink']) {
      this.labelShrink = BooleanUtil.init(this.isLabelShrink);
    }
    if (changes['isNoAnimation']) {
      this.noAnimation = BooleanUtil.init(this.isNoAnimation);
    }
    if (changes['isNoLabel']) {
      this.noLabel = BooleanUtil.init(this.isNoLabel);
    }
    if (changes['isReadOnly']) {
      this.readOnly = BooleanUtil.init(this.isReadOnly);
    }
    if (changes['isRequired']) {
      this.required = BooleanUtil.init(this.isRequired);
    }
    if (changes['isValueInit']) {
      this.valueInit = BooleanUtil.init(this.isValueInit);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
  }

  public ngAfterContentInit(): void {
    // If 'IsValueInit' is specified and 'FormControlName' is not used, then enable the event on the second call to the 'WriteValue'.
    this.isWriteValueInit = this.valueInit && !this.hostRef.nativeElement.hasAttribute('formcontrolname');
  }

  // ** interface ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public writeValue(value: any): void {
    if (this.isWriteValueInit) {
      this.isWriteValueInit = null;
      this.changeDetectorRef.markForCheck();
      // ValueAccessor.writeValue is being called twice, first time with a phantom null value
      // https://github.com/angular/angular/issues/14988
      // The zone will become stable when the component finishes rendering. And only after that execute the callback.
      // This helps to avoid animation spurious effects.
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        this.writeValueInit.emit();
        this.changeDetectorRef.markForCheck();
      });
    }
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
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  // ** interface ControlValueAccessor - finish **

  // ** Public methods **

  public markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }

  public getBoolean(value: string | boolean | null | undefined): boolean | null {
    return BooleanUtil.init(value);
  }

  // ** Private API **
}
