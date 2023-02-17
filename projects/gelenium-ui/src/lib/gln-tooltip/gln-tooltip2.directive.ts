import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { GlnTooltipConfig } from './gln-tooltip-config.interface';

const CSS_INSET: { [key: string]: string } = {
  'bottom': 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  'top': 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  'right': 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
  'left': 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
};

let uniqueIdCounter = 0;

@Directive({
  selector: '[glnTooltip2]',
  exportAs: 'glnTooltip2',
})
export class GlnTooltip2Directive implements OnChanges, OnInit, OnDestroy {
  @Input()
  public id = `glntt-${uniqueIdCounter++}`;
  @Input('glnTooltip2Config')
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnTooltip2')
  public message: string | null | undefined;
  @Input('glnTooltip2Position')
  public position: string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public positionVal: string | null = null; // Binding attribute "position"

  private panelToolip: HTMLDivElement | null = null;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject('GLN_TOOLTIP_CONFIG') private rootConfig: GlnTooltipConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    // HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-tooltip', true);
  }

  @HostListener('mousedown', ['$event'])
  public doMousedown(event: MouseEvent): void {
    console.log(`doMousedown();`); // # mouseenter
    this.toggle();
  }
  // @HostListener('mouseup')
  // public doMouseup(event: MouseEvent): void {
  //   console.log(`doMouseup();`); // # mouseout
  //   this.hide();
  // }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['position'] || (changes['config'] && this.positionVal == null && this.currConfig.position != null)) {
      this.positionVal = CSS_INSET[this.position || this.currConfig.position || ''] || CSS_INSET['bottom'];
    }
  }

  public ngOnInit(): void {
    console.log(`OnInit();`); // #

    if (this.positionVal == null) {
      this.positionVal = CSS_INSET[this.currConfig.position || ''] || CSS_INSET['bottom'];
    }
  }

  public ngOnDestroy(): void {
    console.log(`OnDestroy();`); // #
  }

  // ** Public methods **

  /** Show tooltip after delay in ms, default is 0 ms delay. */
  public show(delay: number = 0): void {
    const parentElement: HTMLElement | null = this.hostRef.nativeElement.parentElement;
    if (!this.isDisabledVal && !this.panelToolip && !!this.message && !!parentElement) {
      console.log(`show();`); // #
      const position: string = this.positionVal || '';
      this.panelToolip = this.createPanel(this.document, this.id + '_box', this.message, position);
      this.panelToolip.style.setProperty('inset', this.getCssInset(position));
      // const origRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
      const hostElem: HTMLElement = this.hostRef.nativeElement;
      const origRect: DOMRect = new DOMRect(hostElem.offsetLeft, hostElem.offsetTop, hostElem.offsetWidth, hostElem.offsetHeight);
      const { x, y } = this.getTranslate(position, origRect);
      this.panelToolip.style.setProperty('transform', `translate(${x}px, ${y}px)`);

      parentElement.appendChild(this.panelToolip);
      parentElement.insertBefore(this.hostRef.nativeElement, this.panelToolip);
    }
  }

  /** Hides the tooltip after a delay in ms, the default is a delay of 0 ms. */
  public hide(delay: number = 0): void {
    if (!this.isDisabledVal && !!this.panelToolip) {
      console.log(`hide();`); // #
      this.panelToolip.remove();
      this.panelToolip = null;
    }
  }

  /** Shows/hides the tooltip. */
  public toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }

  /** If the tooltip is currently visible, returns true. */
  public isVisible(): boolean {
    return !!this.panelToolip;
  }

  // ** Private methods **

  private getCssInset(position: string): string {
    let result: string = '';
    if (['bottom', 'bottom-start', 'right-start', 'right'].indexOf(position) > -1) {
      result = '0px auto auto 0px';
    } else if (['bottom-end', 'left-start', 'left'].indexOf(position) > -1) {
      result = '0px 0px auto auto';
    } else if (['top', 'top-start', 'right-end'].indexOf(position) > -1) {
      result = 'auto auto 0px 0px';
    } else if (['top-end', 'left-end'].indexOf(position) > -1) {
      result = 'auto 0px 0px auto';
    }
    return result;
  }
  // CSS_PROP_WIDTH triggerRectWidth?.toString().concat('px')
  private createPanel(document: Document, id: string, message: string, position: string): HTMLDivElement {
    const panelDiv: HTMLDivElement = document.createElement('div');
    panelDiv.classList.add('gln-tooltip-panel');
    panelDiv.setAttribute('role', 'tooltip');
    panelDiv.setAttribute('id', id);
    panelDiv.setAttribute('popper-placement', position);
    panelDiv.style.setProperty('margin', '0px');
    panelDiv.style.setProperty('position', 'absolute');
    panelDiv.style.setProperty('z-index', 'var(--glntt-z-index, 1500)');
    panelDiv.style.setProperty('outline', '1px solid green');

    const textDiv: HTMLDivElement = document.createElement('div');
    textDiv.classList.add('gln-tooltip-text');
    textDiv.style.setProperty('opacity', '1');
    textDiv.style.setProperty('transform', 'none');
    const cubicBezier: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
    textDiv.style.setProperty('transition', `opacity 200ms ${cubicBezier} 0ms, transform 133ms ${cubicBezier} 0ms`);
    textDiv.innerText = message;

    panelDiv.appendChild(textDiv);

    return panelDiv;
  }
  private getTranslate(position: string, origRect: DOMRect): { x: number; y: number } {
    let x: number = 0;
    let y: number = 0;
    const origRectLeft: number = Math.round(origRect.left * 100) / 100;
    const origRectTop: number = Math.round(origRect.top * 100) / 100;
    const origRectHeight: number = Math.round(origRect.height * 100) / 100;
    if (position.startsWith('bottom')) {
      y = origRectTop + origRectHeight;
      if ('bottom' === position) {
        x = origRect.left; // ?
      } else if ('bottom-start' === position) {
        x = origRectLeft;
      } else if ('bottom-end' === position) {
        x = -origRectLeft;
      }
    }
    return { x, y };
  }
}
