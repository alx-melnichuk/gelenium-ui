import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

import { OptionsScrollKeys } from '../gln-option/gln-options-scroll.interface';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnAutocomplete } from './gln-autocomplete.interface';
import { GlnAutocompleteTrigger } from './gln-autocomplete-trigger.interface';

interface Focusable {
  focus(): void;
}

const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective implements OnInit, AfterViewInit, GlnAutocompleteTrigger {
  @Input('glnAutocompleteTrigger')
  public autocomplete: GlnAutocomplete | null | undefined;

  protected accessorControl: AbstractControl<any, any> | null = null;
  protected accessorFocusable: Focusable | null = null;
  protected frameRef: ElementRef<HTMLElement> | null = null;
  protected isFocused: boolean = false;
  protected isFocusAttrOnFrame: boolean = false;
  protected isMousedown: boolean | null = false;
  protected skipTimeStamp: number | null = null;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Host() protected control: NgControl | null
  ) {}

  @HostListener('focusin', ['$event'])
  public handlerFocusin(event: FocusEvent): void {
    this.isFocused = true;
    this.handlingFocusin(event);
  }

  @HostListener('focusout', ['$event'])
  public handlerFocusout(event: FocusEvent): void {
    this.isFocused = false;
    this.handlingFocusout(event);
  }

  @HostListener('input', ['$event'])
  public handlerInput(event: InputEvent): void {
    this.handlingInput(event);
  }

  @HostListener('keydown', ['$event'])
  public handlerKeydown(event: KeyboardEvent): void {
    this.handlingKeydown(event);
  }

  @HostListener('mousedown')
  public handlerMousedown(): void {
    this.isMousedown = true;
    this.handlingMousedown();
  }

  @HostListener('mouseup')
  public handlerMouseup(): void {
    this.isMousedown = false;
  }

  public ngOnInit(): void {
    if (this.control) {
      this.accessorControl = this.control.control;
      this.frameRef = HtmlElemUtil.getElementRef(this.hostRef.nativeElement.getElementsByTagName('gln-frame')[0] as HTMLElement) || null;
      const accessor: Focusable = this.control.valueAccessor as unknown as Focusable;
      this.accessorFocusable = accessor != null && typeof accessor['focus'] === 'function' ? accessor : null;
    }
  }

  public ngAfterViewInit(): void {
    this.autocomplete?.setTrigger({
      passFocus: (): void => this.passFocus(),
      getOriginalRect: (): DOMRect | null => this.getOriginalRect(),
      setValue: (value: string): void => this.setValue(value),
      getValue: (): string | null => this.getValue(),
    });
  }

  // ** interface GlnAutocompleteTrigger - start **

  /** Set focus to the current element. */
  public passFocus(): void {
    if (this.accessorFocusable != null) {
      this.accessorFocusable.focus();
    } else if (isPlatformBrowser(this.platformId) && !!this.hostRef) {
      this.hostRef.nativeElement.focus();
    }
  }
  /** Get the dimensions of the source. */
  public getOriginalRect(): DOMRect | null {
    return (this.frameRef?.nativeElement || this.hostRef.nativeElement).getBoundingClientRect();
  }
  /** Set the new value of the current element. */
  public setValue(value: string | null | undefined): void {
    // Update the component's model value.
    if (this.accessorControl != null) {
      this.accessorControl.setValue(value, { emitEvent: true });
    }
    // Update the value of the DOM element.
    const event = new Event('input', { bubbles: true, cancelable: true });
    this.skipTimeStamp = event.timeStamp;
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value as string;
    Promise.resolve().then(() => inputElement.dispatchEvent(event));
  }
  /** Get the value of the current element. */
  public getValue(): string | null {
    return this.accessorControl != null ? this.accessorControl.value : (this.hostRef.nativeElement as HTMLInputElement).value;
  }

  // ** interface GlnAutocompleteTrigger - finish **

  // ** Public methods **

  // ** Private methods **

  private handlingFocusin(event: FocusEvent | null): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    // If the "isFocusAttrOnFrame" flag is set when receiving focus, then do the following:
    //   - reset the flag "isFocusAttrOnFrame";
    //   - remove the focus attribute for the frame element;
    if (this.isFocusAttrOnFrame) {
      this.isFocusAttrOnFrame = false;
      HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
    }
    const noOpenOnMouse = this.autocomplete.noOpenOnMouse;
    const openOnFocus = this.autocomplete.openOnFocus;
    if (!this.autocomplete.isOpen() && ((this.isMousedown && !noOpenOnMouse) || (!this.isMousedown && openOnFocus))) {
      Promise.resolve().then(() => this.autocomplete?.open());
    }
  }

  private handlingFocusout(event: FocusEvent | null): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (this.autocomplete.isOpen()) {
      if (this.autocomplete.isContainerMousedown) {
        // If autocomplete.isContainerMousedown = true when focus is lost, then this means
        // that the mouse click was made on the container of the GlnAutocomplete component.
        // And the input focus will be given to the current trigger.
        // To prevent temporary loss of input focus, do the following:
        //   - set the flag "isFocusAttrOnFrame";
        //   - add an attribute of having focus to the frame element;
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      } else {
        // If autocomplete.isContainerMousedown = false on loss of focus, then this means
        //  that the mouse click was made outside the container of the GlnAutocomplete component.
        // You need to close the options panel.
        Promise.resolve().then(() => this.autocomplete?.close());
      }
    }
  }

  private handlingInput(event: InputEvent): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (this.skipTimeStamp != null) {
      this.skipTimeStamp = null;
    } else if (!this.autocomplete.isOpen()) {
      // Whenever an input element is changed, if the options panel is closed, open this options panel.
      Promise.resolve().then(() => this.autocomplete?.open());
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    const isClearOnEscape = this.autocomplete?.clearOnEscape;
    const notModifierKey = !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
    const isEscapeKey = 'Escape' === event.key && notModifierKey;

    if (isEscapeKey && isClearOnEscape) {
      Promise.resolve().then(() => {
        this.setValue('');
      });
    }

    if (!this.autocomplete.isOpen()) {
      // If the panel of available options is closed.
      if (['ArrowDown', 'ArrowUp'].indexOf(event.key) > -1) {
        Promise.resolve().then(() => {
          this.autocomplete?.open();
        });
      }
    } else {
      // If the panel of available options is open.
      if ('Tab' === event.key || isEscapeKey || ('ArrowUp' === event.key && event.altKey)) {
        Promise.resolve().then(() => {
          this.autocomplete?.close();
        });
      } else if (OptionsScrollKeys.indexOf(event.key) > -1) {
        event.preventDefault();
        event.stopPropagation();
        this.autocomplete.moveMarkedOptionByKey(event.key);
      } else if ('Enter' === event.key) {
        event.preventDefault();
        event.stopPropagation();
        Promise.resolve().then(() => {
          this.autocomplete?.setMarkedOptionAsSelected();
        });
      }
    }
  }

  private handlingMousedown(): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (this.isFocused && !this.autocomplete.noOpenOnMouse) {
      if (!this.autocomplete.isOpen()) {
        Promise.resolve().then(() => this.autocomplete?.open());
      } else {
        Promise.resolve().then(() => this.autocomplete?.close());
      }
    }
  }
}
