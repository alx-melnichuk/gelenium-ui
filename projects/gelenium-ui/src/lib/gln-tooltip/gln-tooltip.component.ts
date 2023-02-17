import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation,
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

export const CSS_CLASS = 'gln-tooltip';
export const CSS_CLASS_PANEL = 'gln-tooltip-panel';
export const CSS_ATTR_PANEL = 'glntt-panel';
export const CSS_CLASS_TEXT = 'gln-tooltip-text';
export const CSS_ATTR_TEXT = 'glntt-text';
export const GLN_TOOLTIP_CONFIG = new InjectionToken<GlnTooltipConfig>('GLN_TOOLTIP_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: '[glnTooltip]',
  exportAs: 'glnTooltip',
  template: '<ng-content></ng-content>',
  styleUrls: ['./gln-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTooltipComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  public id = `glntt-${uniqueIdCounter++}`;
  @Input('glnTooltipConfig')
  public config: GlnTooltipConfig | null | undefined;
  @Input('glnTooltip')
  public message: string | null | undefined;
  @Input('glnTooltipPosition')
  public position: string | null | undefined;

  public currConfig: GlnTooltipConfig;
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public positionVal: string | null = null; // Binding attribute "position"

  private panelToolip: HTMLDivElement | null = null;

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

  constructor(
    // private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject(GLN_TOOLTIP_CONFIG) private rootConfig: GlnTooltipConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
  }

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

  /** Show tooltip after delay in ms, default is 0 ms delay. */
  public show(delay: number = 0): void {
    const parentElement: HTMLElement | null = this.hostRef.nativeElement.parentElement;
    if (!this.isDisabledVal && !this.panelToolip && !!this.message && !!parentElement) {
      console.log(`show();`); // #
      const position: string = this.positionVal || '';
      this.panelToolip = this.createPanel(this.document, this.id + '_box', this.message, position);
      this.panelToolip.style.setProperty('inset', this.getCssInset(position));

      parentElement.appendChild(this.panelToolip);
      parentElement.insertBefore(this.hostRef.nativeElement, this.panelToolip);
      this.updatePosition(this.panelToolip, this.hostRef.nativeElement, position, window.innerWidth, window.innerHeight);
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
    panelDiv.classList.add(CSS_CLASS); // 'gln-tooltip';
    panelDiv.classList.add(CSS_CLASS_PANEL); // 'gln-tooltip-panel'
    panelDiv.setAttribute('role', 'tooltip');
    panelDiv.setAttribute('id', id);
    panelDiv.setAttribute('placement', position);
    panelDiv.setAttribute(CSS_ATTR_PANEL, ''); // 'glntt-panel'
    panelDiv.style.setProperty('margin', '0px');
    panelDiv.style.setProperty('position', 'absolute');

    const textDiv: HTMLDivElement = document.createElement('div');
    textDiv.classList.add(CSS_CLASS_TEXT); // 'gln-tooltip-text'
    textDiv.setAttribute(CSS_ATTR_TEXT, ''); // 'glntt-text'
    textDiv.style.setProperty('opacity', '1');
    textDiv.style.setProperty('transform', 'none');
    const cubicBezier: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
    textDiv.style.setProperty('transition', `opacity 200ms ${cubicBezier} 0ms, transform 133ms ${cubicBezier} 0ms`);
    textDiv.innerText = message;

    panelDiv.appendChild(textDiv);

    return panelDiv;
  }
  private getPosition(
    panelElem: HTMLElement,
    origElem: HTMLElement,
    position: string,
    winWidth: number,
    winHeight: number
  ): { x: number; y: number } {
    let x: number = 0;
    let y: number = 0;
    const isBeginWithBottom: boolean = position.startsWith('bottom');
    const isBeginWithTop: boolean = position.startsWith('top');

    const isBeginWithLeft: boolean = position.startsWith('left');
    const isBeginWithRight: boolean = position.startsWith('right');
    // const origRect: DOMRect = this.hostRef.nativeElement.getBoundingClientRect();
    if (isBeginWithBottom || isBeginWithTop) {
      if (isBeginWithBottom) {
        y = origElem.offsetTop + origElem.offsetHeight;
      } else if (isBeginWithTop) {
        y = -(winHeight - (origElem.offsetTop + origElem.offsetHeight));
      }

      if (position.endsWith('start')) {
        x = origElem.offsetLeft;
      } else if (position.endsWith('end')) {
        x = -(winWidth - (origElem.offsetLeft + origElem.offsetWidth));
      } else {
        x = origElem.offsetLeft + (origElem.offsetWidth - panelElem.offsetWidth) / 2;
      }
    } else if (isBeginWithLeft || isBeginWithRight) {
      if (isBeginWithLeft) {
        x = -(winWidth - origElem.offsetLeft);
        // x = -(winWidth - origRect.x);
      } else if (isBeginWithRight) {
        x = origElem.offsetLeft + origElem.offsetWidth;
        // x = origRect.x + origRect.width;
      }

      if (position.endsWith('start')) {
        y = origElem.offsetTop;
      } else if (position.endsWith('end')) {
        y = -(winHeight - (origElem.offsetTop + origElem.offsetHeight));
        // y = -(winHeight - (origRect.y + origRect.height));
      } else {
        y = 0;
      }
    }
    // translate(x:-783px, y:435px)
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }
  private updatePosition(panelElem: HTMLElement, origElem: HTMLElement, position: string, windowWidth: number, winHeight: number): void {
    const { x, y } = this.getPosition(panelElem, origElem, position, windowWidth, winHeight);
    panelElem.style.setProperty('transform', `translate(${x}px, ${y}px)`);
  }
}
/*
<div role="tooltip" id=":R2ikl7el6kud6:"
  class="MuiTooltip-popper MuiTooltip-popperInteractive css-naz7mp MuiPopperUnstyled-root"
  data-popper-placement="bottom"
  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(537px, 61px);"
>
  <div
    class="MuiTooltip-tooltip MuiTooltip-tooltipPlacementBottom css-1spb1s5"
    style="opacity: 1; transform: none; transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 133ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
  >
  Add
  </div>
</div>
*/
/*
host          left: 175 top: 80                    width: 64.00px height: 36.50px~37px
div                                                width:126.00px height: 37.00px 
bottom-start   inset: 0px         auto          auto        0px;
                 top: 0px; right: auto; bottom: auto; left: 0px;
                                                           top  righ bttm left
bottom        transform: translate( 144px, 117px);  inset: 0px  auto auto 0px ;    .MuiTooltip-popper[data-popper-placement*="bottom"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center top; margin-top: 14px; }
bottom-start  transform: translate( 175px, 117px);  inset: 0px  auto auto 0px ;    .MuiTooltip-popper[data-popper-placement*="bottom"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center top; margin-top: 14px; }
bottom-end    transform: translate(-175px, 117px);  inset: 0px  0px  auto auto;    .MuiTooltip-popper[data-popper-placement*="bottom"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center top; margin-top: 14px; }

top           transform: translate( 144px,-908px);  inset: auto auto  0px 0px ;    .MuiTooltip-popper[data-popper-placement*="top"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center bottom; margin-bottom: 14px; }
top-start     transform: translate( 175px,-908px);  inset: auto auto  0px 0px ;    .MuiTooltip-popper[data-popper-placement*="top"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center bottom; margin-bottom: 14px; }
top-end       transform: translate(-175px,-908px);  inset: auto 0px   0px auto;    .MuiTooltip-popper[data-popper-placement*="top"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: center bottom; margin-bottom: 14px; }
    
right         transform: translate( 239px,  86px);  inset: 0px  auto auto 0px ;    .MuiTooltip-popper[data-popper-placement*="right"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: left center; margin-left: 14px; }
right-start   transform: translate( 239px,  80px);  inset: 0px  auto auto 0px ;    .MuiTooltip-popper[data-popper-placement*="right"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: left center; margin-left: 14px; }
right-end     transform: translate( 239px,-871px);  inset: auto auto 0px  0px ;    .MuiTooltip-popper[data-popper-placement*="right"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: left center; margin-left: 14px; }
    
left          transform: translate(-239px,  86px);  inset: 0px  0px  auto auto;    .MuiTooltip-popper[data-popper-placement*="left"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: right center; margin-right: 14px; }
left-start    transform: translate(-239px,  80px);  inset: 0px  0px  auto auto;    .MuiTooltip-popper[data-popper-placement*="left"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: right center; margin-right: 14px; }
left-end      transform: translate(-239px,-871px);  inset: auto 0px  0px  auto;    .MuiTooltip-popper[data-popper-placement*="left"] .css-ja5taz-MuiTooltip-tooltip { transform-origin: right center; margin-right: 14px; }    

   160[ ]64
      [   ]83   160 + (64-83)

*/
