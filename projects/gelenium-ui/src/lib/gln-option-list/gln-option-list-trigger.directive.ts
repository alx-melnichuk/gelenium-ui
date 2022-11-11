import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  Renderer2,
  Optional,
  Host,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

import { GlnDebounceTimer } from '../_classes/gln-debounce-timer';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { Focusable, Frameable, GlnOptionList } from './gln-option-list.interface';
import { GlnOptionListTrigger } from './gln-option-list-trigger.interface';

const DEBOUNCE_TIMEOUT = 600;
const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const TAG_NAME_OPTION = 'GLN-OPTION';

@Directive({
  selector: '[glnOptionListTrigger]',
  exportAs: 'glnOptionListTrigger',
})
export class GlnOptionListTriggerDirective implements OnInit, OnDestroy, GlnOptionListTrigger {
  @Input('glnOptionListTrigger')
  public optionList: GlnOptionList | null | undefined;

  private accessorControl: AbstractControl<any, any> | null = null;
  private accessorFocusable: Focusable | null = null;
  private frameRef: ElementRef<HTMLElement> | null = null;
  private debounceTimer: GlnDebounceTimer = new GlnDebounceTimer();
  private isFocusAttrOnFrame = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Host() private control: NgControl | null
  ) {}

  @HostListener('mousedown')
  public handlerMousedown(): void {
    this.handlingMousedown();
  }

  @HostListener('keydown', ['$event'])
  public handlerKeydown(event: KeyboardEvent): void {
    this.handlingKeydown(event);
  }

  @HostListener('focusin', ['$event'])
  public handlerFocusin(event: FocusEvent): void {
    this.handlingFocusin(event);
  }

  @HostListener('focusout', ['$event'])
  public handlerFocusout(event: FocusEvent): void {
    this.handlingFocusout(event);
  }

  @HostListener('input', ['$event'])
  public handlerInput(event: InputEvent): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.debounceTimer.run(() => {
      this.handlingInput(inputElement.value);
    }, DEBOUNCE_TIMEOUT);
  }

  public ngOnInit(): void {
    if (this.control) {
      this.accessorControl = this.control.control;
      this.frameRef = (this.control.valueAccessor as unknown as Frameable)?.frameComp?.hostRef || null;
      const accessor: Focusable = this.control.valueAccessor as unknown as Focusable;
      this.accessorFocusable = accessor != null && typeof accessor['focus'] === 'function' ? accessor : null;
    }
  }

  public ngOnDestroy(): void {
    this.debounceTimer.clear();
  }

  // ** interface GlnOptionListTrigger - start **

  /** Set focus to the current element. */
  public passFocus(): void {
    console.log(`passFocusToOriginal();`); // #
    if (this.accessorFocusable != null) {
      this.accessorFocusable.focus();
    } else if (isPlatformBrowser(this.platformId) && !!this.hostRef) {
      this.hostRef.nativeElement.focus();
    }
  }
  /** Get the dimensions of the source. */
  public getOriginalRect(): DOMRect | null {
    return this.hostRef?.nativeElement.getBoundingClientRect() || null;
  }
  /** Set the new value of the current element. */
  public setValue(value: string | null | undefined): void {
    console.log(`setValueForOriginal(); value=${value}`); // #
    // Update the component's model value.
    if (this.accessorControl != null) {
      this.accessorControl.setValue(value, { emitEvent: true });
    }
    // Update the value of the DOM element.
    const event = new Event('input', { bubbles: true, cancelable: true });
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value || '';
    inputElement.dispatchEvent(event);
  }

  // ** interface GlnOptionListTrigger - finish **

  // ** Public methods **

  // ** Private methods **

  private handlingMousedown(): void {
    if (this.optionList == null) {
      return;
    }
    if (this.optionList.isPanelOpen()) {
      this.optionList?.closePanel();
    } else {
      this.openOptionsPanel();
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.optionList == null) {
      return;
    }
    if (this.optionList.isPanelOpen()) {
      switch (event.key) {
        case 'Escape':
        case 'Tab':
          this.optionList?.closePanel();
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          this.optionList?.moveMarkedOption(event.key === 'ArrowDown' ? 1 : -1);
          break;
      }
    } else {
      switch (event.key) {
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          this.openOptionsPanel();
          break;
      }
    }
    // #if (!this.disabled && this.isPanelOpen) { }
  }

  private handlingInput = (inputValue: string): void => {
    console.log(`handlingInput() inputValue=${inputValue}`);
  };

  private handlingFocusin(event: FocusEvent | null): void {
    if (this.optionList == null) {
      return;
    }
    if (this.frameRef != null && this.isFocusAttrOnFrame) {
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
    }
    if (this.isFocusAttrOnFrame) {
      this.isFocusAttrOnFrame = false;
    }
  }

  private handlingFocusout(event: FocusEvent | null): void {
    if (this.optionList == null) {
      return;
    }
    const element: HTMLElement | null = (event?.relatedTarget as HTMLElement) || null;
    if (this.frameRef != null && element?.tagName === TAG_NAME_OPTION) {
      // It is required to return input focus to the current input element.
      this.isFocusAttrOnFrame = true;
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
    } else if (this.optionList.isPanelOpen()) {
      this.optionList.closePanel();
    }
  }

  private openOptionsPanel(): void {
    this.optionList?.openPanel({
      passFocus: (): void => this.passFocus(),
      getOriginalRect: (): DOMRect | null => this.getOriginalRect(),
      setValue: (value: string): void => this.setValue(value),
    });
  }
}
