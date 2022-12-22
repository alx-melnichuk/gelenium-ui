import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
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

const CSS_ATTR_FOR_FRAME_FOCUS = 'foc';
const TAG_NAME_OPTION = 'GLN-OPTION';

interface Focusable {
  focus(): void;
}

interface HostableRef {
  hostRef: ElementRef<HTMLElement>;
}

interface Frameable {
  frameComp: HostableRef;
}

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective implements OnInit, AfterContentInit, GlnAutocompleteTrigger {
  @Input('glnAutocompleteTrigger')
  public autocomplete: GlnAutocomplete | null | undefined;

  protected accessorControl: AbstractControl<any, any> | null = null;
  protected accessorFocusable: Focusable | null = null;
  protected frameRef: ElementRef<HTMLElement> | null = null;
  protected isFocusAttrOnFrame = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Host() protected control: NgControl | null
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

  public ngOnInit(): void {
    if (this.control) {
      this.accessorControl = this.control.control;
      this.frameRef = (this.control.valueAccessor as unknown as Frameable)?.frameComp?.hostRef || null;
      const accessor: Focusable = this.control.valueAccessor as unknown as Focusable;
      this.accessorFocusable = accessor != null && typeof accessor['focus'] === 'function' ? accessor : null;
    }
  }

  public ngAfterContentInit(): void {
    this.autocomplete?.setTrigger({
      passFocus: (): void => this.passFocus(),
      getOriginalRect: (): DOMRect | null => this.getOriginalRect(),
      setValue: (value: string): void => this.setValue(value),
    });
  }

  // ** interface GlnAutocompleteTrigger - start **

  /** Set focus to the current element. */
  public passFocus(): void {
    // #console.log(`passFocusToOriginal();`); // #
    if (this.accessorFocusable != null) {
      this.accessorFocusable.focus();
    } else if (isPlatformBrowser(this.platformId) && !!this.hostRef) {
      this.hostRef.nativeElement.focus();
    }
  }
  /** Get the dimensions of the source. */
  public getOriginalRect(): DOMRect | null {
    let elementFrame: HTMLElement | null = null;
    if (['GLN-INPUT'].indexOf(this.hostRef.nativeElement.tagName) > -1) {
      elementFrame = (this.hostRef.nativeElement.children[0]?.children[0] as HTMLElement) || null;
    }
    return (elementFrame || this.hostRef.nativeElement).getBoundingClientRect();
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
    inputElement.value = value as string;
    inputElement.dispatchEvent(event);
  }

  // ** interface GlnAutocompleteTrigger - finish **

  // ** Public methods **

  // ** Private methods **

  private handlingMousedown(): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (this.autocomplete.isPanelOpen()) {
      this.autocomplete.close();
    } else {
      this.autocomplete.open();
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (!this.autocomplete.isPanelOpen()) {
      switch (event.key) {
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          this.autocomplete.open();
          break;
      }
    } else {
      // #console.log(`event.key=${event.key}`); // #
      const notModifierKey = !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
      if ((['Escape', 'Tab'].indexOf(event.key) > -1 && notModifierKey) || ('ArrowUp' === event.key && event.altKey)) {
        this.autocomplete.close();
      } else if (OptionsScrollKeys.indexOf(event.key) > -1) {
        event.preventDefault();
        event.stopPropagation();
        this.autocomplete.moveMarkedOptionByKey(event.key);
      } else if ('Enter' === event.key) {
        event.preventDefault();
        event.stopPropagation();
        // #console.log(`'Enter' === event.key`); // #
        this.autocomplete.setMarkedOptionAsSelected();
      }
    }
  }

  private handlingFocusin(event: FocusEvent | null): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
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
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    if (this.autocomplete.isPanelOpen()) {
      const element: HTMLElement | null = (event?.relatedTarget as HTMLElement) || null;
      const tagName: string = element?.tagName || '';
      if (tagName !== TAG_NAME_OPTION) {
        this.autocomplete.close(); // return back.
      } else if (this.frameRef != null) {
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      }
    }
  }
}
