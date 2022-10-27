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

import { GlnAutocompleteOptions } from './gln-autocomplete-options.interface';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';
import { Focusable, Frameable } from './gln-autocomplete.interface';

const DEBOUNCE_TIMEOUT = 600;
const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const TAG_NAME_OPTION = 'GLN-OPTION';

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective implements OnInit, OnDestroy, GlnAutocompleteTrigger {
  @Input('glnAutocompleteTrigger')
  public glnAutocompleteOptions: GlnAutocompleteOptions | null | undefined;

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
      const frameable: Frameable = this.control.valueAccessor as unknown as Frameable;
      this.frameRef = frameable?.frameComp?.hostRef || null;

      const accessor: Focusable = this.control.valueAccessor as unknown as Focusable;
      if (accessor != null) {
        let isFocusable = false;
        try {
          isFocusable = typeof accessor['focus'] === 'function';
        } finally {
          this.accessorFocusable = isFocusable ? accessor : null;
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this.debounceTimer.clear();
  }

  // ** interface GlnAutocompleteTrigger - start **

  public setFocus(): void {
    console.log(`setFocus();`); // #
    if (this.accessorFocusable != null) {
      this.accessorFocusable.focus();
    } else if (isPlatformBrowser(this.platformId) && !!this.hostRef) {
      this.hostRef.nativeElement.focus();
    }
  }

  public getOriginRect(): DOMRect | null {
    return this.hostRef?.nativeElement.getBoundingClientRect() || null;
  }

  public setValueForInput(value: string): void {
    console.log(`setValueForInput(); value=${value}`); // #
    // Update the component's model value.
    if (this.accessorControl != null) {
      this.accessorControl.setValue(value, { emitEvent: true });
    }
    // Update the value of the DOM element.
    const event = new Event('input', { bubbles: true, cancelable: true });
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value;
    inputElement.dispatchEvent(event);
  }

  // ** interface GlnOptionParent - finish **

  // ** Public methods **

  public demo(value: string): void {
    const event = new Event('input', { bubbles: true });
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value;
    inputElement.dispatchEvent(event);
  }

  // ** Private methods **

  private handlingMousedown(): void {
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    if (this.glnAutocompleteOptions.isPanelOpen()) {
      this.closeOptionsPanel();
    } else {
      this.openOptionsPanel();
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    if (this.glnAutocompleteOptions.isPanelOpen()) {
      switch (event.key) {
        case 'Escape':
        case 'Tab':
          this.closeOptionsPanel();
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          this.movingMarkedOptionsPanel(event.key === 'ArrowDown' ? 1 : -1);
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
    if (this.glnAutocompleteOptions == null) {
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
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    const element: HTMLElement | null = (event?.relatedTarget as HTMLElement) || null;
    if (this.frameRef != null && element?.tagName === TAG_NAME_OPTION) {
      // It is required to return input focus to the current input element.
      this.isFocusAttrOnFrame = true;
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
    } else if (this.glnAutocompleteOptions.isPanelOpen()) {
      this.glnAutocompleteOptions.closePanel();
    }
  }

  private openOptionsPanel(): void {
    this.glnAutocompleteOptions?.openPanel({
      setFocus: (): void => this.setFocus(),
      getOriginRect: (): DOMRect | null => this.getOriginRect(),
      setValueForInput: (value: string): void => this.setValueForInput(value),
    });
  }
  private closeOptionsPanel(): void {
    this.glnAutocompleteOptions?.closePanel();
  }
  private movingMarkedOptionsPanel(delta: number): void {
    this.glnAutocompleteOptions?.movingMarkedOption(delta);
  }
}
