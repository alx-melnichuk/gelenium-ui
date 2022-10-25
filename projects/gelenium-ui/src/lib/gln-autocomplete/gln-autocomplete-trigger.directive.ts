import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

import { GlnDebounceTimer } from '../_classes/gln-debounce-timer';

import { GlnAutocompleteOptions } from './gln-autocomplete-options.interface';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';

const DEBOUNCE_TIMEOUT = 600;

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective implements OnInit, OnDestroy, GlnAutocompleteTrigger {
  @Input('glnAutocompleteTrigger')
  public glnAutocompleteOptions: GlnAutocompleteOptions | null | undefined;

  private debounceTimer: GlnDebounceTimer = new GlnDebounceTimer();

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    public hostRef: ElementRef<HTMLElement>
  ) {
    // setTimeout(() => {
    //   this.setValueForInput('value');
    // }, 4000);
  }

  public ngOnDestroy(): void {
    this.debounceTimer.clear();
  }

  @HostListener('click')
  public handlerClick(): void {
    this.handlingClick();
  }

  @HostListener('keydown', ['$event'])
  public handlerKeydown(event: KeyboardEvent): void {
    this.handlingKeydown(event);
  }

  /*@HostListener('focusin', ['$event'])
  public handlerFocusin(event: any): void {
    console.log(`handlerFocusin() event=`, event); // #
    // if (this.glnAutocompleteOptions != null) {
    //   this.glnAutocompleteOptions.openPanel(this.hostRef);
    // }
  }*/

  /*@HostListener('focusout', ['$event'])
  public handlerFocusout(event: any): void {
    console.log(`handlerFocusout() event=`, event); // #
    // if (this.glnAutocompleteOptions != null) {
    //   this.glnAutocompleteOptions.closePanel();
    // }
    // this.handlingFocusout(event);
  }*/

  @HostListener('input', ['$event'])
  public handlerInput(event: InputEvent): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.debounceTimer.run(() => {
      this.handlingInput(inputElement.value);
    }, DEBOUNCE_TIMEOUT);
  }

  public ngOnInit(): void {
    console.log(`glnAutocompleteOptions ${this.glnAutocompleteOptions != null ? '!=' : '=='} null`); // #
  }

  // ** interface GlnAutocompleteTrigger - start **

  public setFocus(): void {
    console.log(`setFocus();`); // #
    if (isPlatformBrowser(this.platformId) && !!this.hostRef) {
      this.hostRef.nativeElement.focus();
    }
  }

  public getOriginRef(): ElementRef<HTMLElement> {
    return this.hostRef;
  }

  public setValueForInput(value: string): void {
    console.log(`setValueForInput(); value=${value}`); // #
    const event = new Event('input', { bubbles: true });
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

  private handlingClick(): void {
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    if (this.glnAutocompleteOptions.isPanelOpen()) {
      this.glnAutocompleteOptions.closePanel();
    } else {
      this.glnAutocompleteOptions.openPanel(this);
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    // #console.log(`handlingKeydown() event=`, event, ' event.key=', event.key); // #
    if (this.glnAutocompleteOptions.isPanelOpen()) {
      switch (event.key) {
        case 'Escape':
        case 'Tab':
          this.glnAutocompleteOptions.closePanel();
          break;
      }
    } else {
      switch (event.key) {
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          this.glnAutocompleteOptions.openPanel(this);
          break;
      }
    }
    // #if (!this.disabled && this.isPanelOpen) { }
  }

  private handlingInput = (inputValue: string): void => {
    console.log(`handlingInput() inputValue=${inputValue}`);
  };

  private handlingFocusout(event: FocusEvent | null): void {
    if (this.glnAutocompleteOptions == null) {
      return;
    }
    if (event != null && event.relatedTarget != null) {
      const element: HTMLElement = event.relatedTarget as HTMLElement;
      if (element.tagName === 'GLN-OPTION') {
        // It is required to return input focus to the current input element.
      }
      // event.relatedTarget.getBoundingClientRect()
      // DOMRect { bottom: 190.515625, height: 36, left: 247.265625, right: 407.265625, top: 154.515625, width: 160, x: 247.265625, y: 154.515625  }
    }
  }
}
