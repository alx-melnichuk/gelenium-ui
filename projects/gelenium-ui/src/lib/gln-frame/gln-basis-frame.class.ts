import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
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
  public isDisabled: string | null = null;
  @Input()
  public isValueInit: string | null = null;
  @Input()
  public noAnimation: string | boolean | null = null;

  @Output()
  readonly writeValueInit: EventEmitter<() => void> = new EventEmitter();

  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public isNoAnimation: boolean | null = null; // Binding attribute "noAnimation".
  public isWriteValueInit: boolean | null = null;
  public valueInit: boolean | null = null; // Binding attribute "isValueInit".

  constructor(
    uniqueIdCounter: number,
    public prefix: string,
    public hostRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    this.id = `${prefix}-${uniqueIdCounter}`;
    if (!prefix) {
      console.warn('The "prefix" parameter is not defined, and therefore the "id" value is not unique.');
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabledState(!!this.disabled);
    }
    if (changes.isValueInit) {
      this.valueInit = BooleanUtil.init(this.isValueInit);
    }
    if (changes.noAnimation) {
      this.isNoAnimation = BooleanUtil.init(this.noAnimation != null ? '' + this.noAnimation : null);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    // console.log(`OnInit(${this.id}); menuItems.length=${this.menuItemList == null ? 'null' : this.menuItemList.length}`); // TODO del;
  }

  public ngAfterContentInit(): void {
    // If 'IsValueInit' is specified and 'FormControlName' is not used, then enable the event on the second call to the 'WriteValue'.
    this.isWriteValueInit = this.valueInit && !this.hostRef.nativeElement.hasAttribute('formcontrolname');
    console.log(`${this.prefix}  AfterContentInit(${this.id});  isWriteValueInit=${this.isWriteValueInit}`); // TODO del;
  }

  // ** ControlValueAccessor - start **

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public writeValue(value: any): void {
    console.log(`${this.prefix} writeValue(${this.id}) value=${value == null ? 'null' : value}`);

    if (this.isWriteValueInit) {
      this.isWriteValueInit = null;
      console.log(`           ${this.id}  isWriteValueInit=null`); // TODO del;
      this.changeDetectorRef.markForCheck();
      Promise.resolve().then(() => {
        console.log(`           ${this.id}  writeValueInit.emit()`); // TODO del;
        this.writeValueInit.emit(this.markForCheck);
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

  // ** ControlValueAccessor - finish **

  // ** Public API **

  public markForCheck = (): void => {
    console.log(`${this.prefix}      ${this.id} markForCheck()`);
    this.changeDetectorRef.markForCheck();
  };

  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }

  // ** Private API **
}
