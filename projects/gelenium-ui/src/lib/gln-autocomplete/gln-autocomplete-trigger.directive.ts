import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { GlnAutocompleteOptions } from './gln-autocomplete-options.interface';

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective implements OnInit {
  @Input('glnAutocompleteTrigger')
  public glnAutocompleteOptions: GlnAutocompleteOptions | null | undefined;

  constructor(public hostRef: ElementRef<HTMLElement>) {
    // setTimeout(() => {
    //   this.demo('test01');
    // }, 4000);
  }

  @HostListener('focusin')
  public handlerFocusin(): void {
    console.log(`handlerFocusin()`); // #
    if (this.glnAutocompleteOptions != null) {
      this.glnAutocompleteOptions.openPanel();
    }
  }

  @HostListener('focusout')
  public handlerFocusout(): void {
    console.log(`handlerFocusout()`); // #
    if (this.glnAutocompleteOptions != null) {
      this.glnAutocompleteOptions.closePanel();
    }
  }

  @HostListener('input', ['$event'])
  public handlerInput(event: InputEvent): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    console.log(`handlerInput() event=`, event, ' inputElement.value=', inputElement.value); // #
  }

  @HostListener('keydown', ['$event'])
  public handlerKeydown(event: KeyboardEvent): void {
    console.log(`handlerKeydown() event=`, event, ' event.key=', event.key); // #
  }

  public ngOnInit(): void {
    console.log(`glnAutocompleteOptions ${this.glnAutocompleteOptions != null ? '!=' : '=='} null`); // #
  }

  // ** Public methods **

  public demo(value: string): void {
    const event = new Event('input', { bubbles: true });
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value;
    inputElement.dispatchEvent(event);
  }
}
