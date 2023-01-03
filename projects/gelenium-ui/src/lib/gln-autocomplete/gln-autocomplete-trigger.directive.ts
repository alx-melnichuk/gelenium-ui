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
export class GlnAutocompleteTriggerDirective implements OnInit, AfterViewInit, GlnAutocompleteTrigger {
  @Input('glnAutocompleteTrigger')
  public autocomplete: GlnAutocomplete | null | undefined;

  protected accessorControl: AbstractControl<any, any> | null = null;
  protected accessorFocusable: Focusable | null = null;
  protected frameRef: ElementRef<HTMLElement> | null = null;
  protected isFocusAttrOnFrame: boolean = false;
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
    this.handlingFocusin(event);
  }

  @HostListener('focusout', ['$event'])
  public handlerFocusout(event: FocusEvent): void {
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
    this.handlingMousedown();
  }

  public ngOnInit(): void {
    if (this.control) {
      this.accessorControl = this.control.control;
      this.frameRef = (this.control.valueAccessor as unknown as Frameable)?.frameComp?.hostRef || null;
      const accessor: Focusable = this.control.valueAccessor as unknown as Focusable;
      this.accessorFocusable = accessor != null && typeof accessor['focus'] === 'function' ? accessor : null;
    }
  }

  public ngAfterViewInit(): void {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    console.log(`ACT().AfterViewInit() rect.width=${rect.width}`); // #
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
    // Update the component's model value.
    if (this.accessorControl != null) {
      this.accessorControl.setValue(value, { emitEvent: true });
    }
    // Update the value of the DOM element.
    const event = new Event('input', { bubbles: true, cancelable: true });
    this.skipTimeStamp = event.timeStamp;
    console.log(`ACT().setValue(${value}); {Ib} skipTimeStamp=${this.skipTimeStamp};`); // #
    const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
    inputElement.value = value as string;
    Promise.resolve().then(() => {
      console.log(`ACT().setValue(${value}); {IIb} inputElement.dispatchEvent(event);`); // #
      inputElement.dispatchEvent(event);
    });
  }
  /** Get the value of the current element. */
  public getValue(): string | null {
    let result: string | null = null;
    if (this.accessorControl != null) {
      result = this.accessorControl.value;
    } else {
      const inputElement: HTMLInputElement = this.hostRef.nativeElement as HTMLInputElement;
      result = inputElement.value;
    }
    return result;
  }

  // ** interface GlnAutocompleteTrigger - finish **

  // ** Public methods **

  // ** Private methods **

  private handlingFocusin(event: FocusEvent | null): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    const strIsFocusAttr = this.isFocusAttrOnFrame ? 'isFocusAttr:true' : '';
    console.log(`ACT().handlingFocusin(); {If} ${strIsFocusAttr};`); // #
    if (this.isFocusAttrOnFrame) {
      this.isFocusAttrOnFrame = false;
      console.log(`ACT().handlingFocusin(); {If} isFocusAttr=false;`); // #
      if (this.frameRef != null) {
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, null);
      }
    }
    if (this.autocomplete.openOnFocus && !this.autocomplete.isOpen()) {
      Promise.resolve().then(() => {
        console.log(`ACT().handlingFocusin(); {IIf} openOnFocus:true; autocomplete?.open();`); // #
        this.autocomplete?.open();
      });
    }
  }

  private handlingFocusout(event: FocusEvent | null): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    const isOpen = this.autocomplete.isOpen();
    const strIsFocusAttr = this.isFocusAttrOnFrame ? 'isFocusAttr:true' : '';
    console.log(`ACT().handlingFocusout(); {Id} autocomplete.isOpen():${isOpen} ${strIsFocusAttr};`); // #
    if (this.autocomplete.isOpen()) {
      if (!this.autocomplete.isContainerMousedown) {
        Promise.resolve().then(() => {
          console.log(`ACT().handlingFocusout(); {IId} isContnrMouseDown:false; autocomplete?.close();`); // #
          // this.autocomplete?.close(); // return back.
        });
      } else if (this.frameRef != null) {
        console.log(`ACT().handlingFocusout(); {Id}isContnrMouseDown:true; isFocusAttr=true;`); // #
        this.isFocusAttrOnFrame = true;
        HtmlElemUtil.setAttr(this.renderer, this.frameRef, CSS_ATTR_FOR_FRAME_FOCUS, '');
      }
    }
  }

  private handlingInput(event: InputEvent): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    // #const value: number | string | null = (event.target as HTMLInputElement).value;
    const isOpen = this.autocomplete.isOpen();
    const skipTmSt = this.skipTimeStamp;
    console.log(`ACT().handlingInput(); {Ic} autocomplete.isOpen():${isOpen}${skipTmSt ? ' skipTimeStamp:' + skipTmSt : ''};`); // #

    if (this.skipTimeStamp != null) {
      this.skipTimeStamp = null;
      console.log(`ACT().handlingInput(); {Ic}this.skipTimeStamp=null;`); // #
    } else if (!this.autocomplete.isOpen()) {
      Promise.resolve().then(() => {
        console.log(`ACT().handlingInput(); {IIc} autocomplete?.open();`); // #
        this.autocomplete?.open(); /*important!*/
      });
    }
  }

  private handlingKeydown(event: KeyboardEvent): void {
    if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    // #console.log(`event.key=${event.key}`); // #
    const isClearOnEscape = this.autocomplete?.clearOnEscape;
    const notModifierKey = !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
    const isEscapeKey = 'Escape' === event.key && notModifierKey;
    const st1 = isEscapeKey ? `isEscapeKey:${isEscapeKey}; isClearOnEscape:${isClearOnEscape};` : '';
    console.log(`ACT().handlingKeydown(); {Ie} ${st1}`); // #
    if (isEscapeKey && isClearOnEscape) {
      Promise.resolve().then(() => {
        this.setValue('');
      });
    }

    if (!this.autocomplete.isOpen()) {
      // If the panel of available options is closed.
      if (['ArrowDown', 'ArrowUp'].indexOf(event.key) > -1) {
        Promise.resolve().then(() => {
          console.log(`ACT().handlingKeydown(); {IIe} autocomplete?.open();`); // #
          this.autocomplete?.open();
        });
      }
    } else {
      // If the panel of available options is open.
      if ('Tab' === event.key || isEscapeKey || ('ArrowUp' === event.key && event.altKey)) {
        Promise.resolve().then(() => {
          console.log(`ACT().handlingKeydown(Tab,Escape,Alt+ArrowUp); autocomplete?.close();`); // #
          this.autocomplete?.close();
        });
      } else if (OptionsScrollKeys.indexOf(event.key) > -1) {
        event.preventDefault();
        event.stopPropagation();
        this.autocomplete.moveMarkedOptionByKey(event.key);
      } else if ('Enter' === event.key) {
        event.preventDefault();
        event.stopPropagation();
        // #console.log(`'Enter' === event.key`); // #
        Promise.resolve().then(() => {
          console.log(`ACT().handlingKeydown(Enter) autocomplete?.setMarkedOptionAsSelected();`); // #
          this.autocomplete?.setMarkedOptionAsSelected();
        });
      }
    }
  }

  private handlingMousedown(): void {
    /*if (this.autocomplete == null || this.autocomplete.disabled) {
      return;
    }
    const isPanelOpen = this.autocomplete.isOpen();
    Promise.resolve().then(() => {
      console.log(`ACT().handlingMousedown() autocomplete?.${isPanelOpen ? 'close()' : 'open()'};`); // #
      if (isPanelOpen) {
        this.autocomplete?.close();
      } else {
        this.autocomplete?.open();
      }
    });*/
  }
}
