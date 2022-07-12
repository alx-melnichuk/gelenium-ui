import { CdkConnectedOverlay, ConnectedPosition, HorizontalConnectionPos, ScrollStrategy } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';
import { GlnOption3Component } from './gln-option3.component';
import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select3.providers';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-select3',
  templateUrl: './gln-select3.component.html',
  styleUrls: ['./gln-select3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSelect3Component implements OnChanges {
  // ** abstract class GlnBasisFrame -v **
  @Input()
  public id = `glns-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public isRequired: string | null = null;
  @Input()
  public isValueInit: string | null = null;
  @Input()
  public noAnimation: string | boolean | null = null;
  // ** abstract class GlnBasisFrame -^ **
  @Input()
  public isFixRight: string | boolean | null | undefined;
  @Input()
  public isMultiple: string | null = null;

  @Input()
  public label: string | undefined;
  @Input()
  public noElevation: string | null = null;
  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  @Input()
  public panelClass: string | string[] | Set<string> | { [key: string]: any } = '';
  @Input()
  public placeholder: string | undefined;
  @Input()
  public selected: string | undefined;

  @ContentChildren(GlnOption3Component) // GlnMenuItemComponent
  public menuItemList!: QueryList<GlnOption3Component>;
  // GlnMenuItemComponent
  public get menuItems(): GlnOption3Component[] {
    return this.menuItemList?.toArray() || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set menuItems(value: GlnOption3Component[]) {}

  @ViewChild('input')
  public input: ElementRef | undefined;
  /** The trigger on which the selection opens. */
  @ViewChild('trigger', { static: true })
  public trigger!: ElementRef<HTMLElement>;
  /** Overlay panel with its own parameters. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;

  // ** abstract class GlnBasisFrame -v **
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public isWriteValueInit: boolean | null = null;
  public multiple: boolean | null = null; // Binding attribute "isMultiple".
  public noAnimations: boolean | null = null; // Binding attribute "noAnimation".
  public required: boolean | null = null; // Binding attribute "isRequired".
  public valueInit: boolean | null = null; // Binding attribute "isValueInit".
  // ** abstract class GlnBasisFrame -^ **

  public hasPanelAnimation = false;
  public fixRight = false;
  public isFocused = false;
  public isPanelOpen = false;
  /** Y-axis offset of the overlay panel relative to the top start corner of the trigger.
   * This needs to be adjusted to align the selected option text above the trigger text.
   * When opening the panel, will vary depending on the position of the selected option along the Y axis.
   */
  // TODO ?? public offsetY = 0;
  public overlayPanelClass: string | string[] = /*this._defaultOptions?.overlayPanelClass ||*/ '';
  public positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
  ];
  /** Strategy for handling scrolling when the selection panel is open. */
  public scrollStrategy: ScrollStrategy;
  /** Preserve the font size of the trigger element. */
  public triggerFontSize = 0;
  /** The position and dimensions for the trigger's bounding box. */
  public triggerRect: DOMRect; // TODO del; ClientRect;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public hostRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Optional() @Inject(GLN_SELECT_SCROLL_STRATEGY) private scrollStrategyFactory: any
  ) {
    const overlayScrollStrategyFactory = this.scrollStrategyFactory;
    this.scrollStrategy = overlayScrollStrategyFactory();
    this.triggerRect = this.trigger?.nativeElement.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // ** abstract class GlnBasisFrame -v **
    if (changes.isDisabled) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      // this.setDisabledState(!!this.disabled);
    }
    // ** abstract class GlnBasisFrame -^ **
    if (changes.isMultiple) {
      this.multiple = BooleanUtil.init(this.isMultiple);
    }
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
    // ** abstract class GlnBasisFrame -v **
    if (changes.isValueInit) {
      this.valueInit = BooleanUtil.init(this.isValueInit);
    }
    // ** abstract class GlnBasisFrame -^ **
    if (changes.noAnimation) {
      this.noAnimations = BooleanUtil.init(this.noAnimation != null ? '' + this.noAnimation : null);
    }
    if (changes.isFixRight) {
      this.fixRight = !!BooleanUtil.init(this.isFixRight != null ? '' + this.isFixRight : null);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'is-fix-right', !!this.isFixRight);
    }
  }

  // ** Public methods **

  // ** abstract class GlnBasisFrame -v **
  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }
  // ** abstract class GlnBasisFrame -^ **

  public setHasPanelAnimation(): void {
    this.hasPanelAnimation = !this.noAnimations && !this.isPanelOpen && this.hasPanelAnimation ? false : this.hasPanelAnimation;
    // this.connectedOverlay.connectionPair;
  }
  /** Open or close the overlay panel. */
  public toggle(): void {
    this.isPanelOpen ? this.close() : this.open();
  }
  /** Open overlay panel. */
  public open(): void {
    if (this.isCanOpen()) {
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.noAnimations ? true : this.hasPanelAnimation;
      console.log('hasPanelAnimation=', this.hasPanelAnimation); // TODO del;
      this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
      this.settingPosition(this.fixRight);
      this.triggerFontSize = Number((getComputedStyle(this.trigger.nativeElement).fontSize || '0').replace('px', ''));
      // this._keyManager.withHorizontalOrientation(null);
      // this._highlightCorrectOption();
      this.changeDetectorRef.markForCheck();
    }
  }

  /** Closes the overlay panel and focuses the main element. */
  public close(): void {
    console.log(`close() isPanelOpen=${this.isPanelOpen}`);
    if (this.isPanelOpen) {
      if (!this.noAnimation) {
        const panelWrap = this.connectedOverlay.overlayRef.hostElement.children[0]?.children[0] as HTMLElement;
        this.setPropertiesForTranslate(panelWrap, this.triggerRect, ScreenUtil.getHeight());
      }
      this.isPanelOpen = false;
      // this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
      this.changeDetectorRef.markForCheck();
      // this._onTouched();
    }
  }

  public doFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
      // this.stateChanges.next();
    }
  }
  /** Calls the touch callback only when the panel is closed.
   * Otherwise, it will cause a false positive, "blur" on the panel when it is opened.
   */
  public doBlur(): void {
    this.isFocused = false;

    if (!this.disabled && !this.isPanelOpen) {
      // this._onTouched();
      this.changeDetectorRef.markForCheck();
      // this.stateChanges.next();
    }
  }

  /** Callback when the overlay panel is attached. */
  public attach(): void {
    if (this.triggerFontSize && !!this.connectedOverlay?.overlayRef?.overlayElement) {
      this.connectedOverlay.overlayRef.overlayElement.style.fontSize = `${this.triggerFontSize}px`;
    }
    if (!this.noAnimation && !!this.connectedOverlay?.overlayRef?.overlayElement?.children[0]) {
      const panelWrap = this.connectedOverlay.overlayRef.overlayElement.children[0] as HTMLElement;
      this.setPropertiesForTranslate(panelWrap, this.triggerRect, ScreenUtil.getHeight());
    }
  }

  // ** Proteced methods **

  /** Is it possible to open the panel. */
  protected isCanOpen(): boolean {
    return !this.isPanelOpen && !this.disabled && this.menuItems.length > 0;
  }

  protected getHeight(value: ElementRef<HTMLElement> | null): number {
    return value ? Number(getComputedStyle(value.nativeElement).getPropertyValue('height').replace('px', '')) : 0;
  }

  protected settingPosition(fixRight: boolean): void {
    const horizontalAlignment: HorizontalConnectionPos = !fixRight ? 'start' : 'end';
    const positionPanelDown: ConnectedPosition[] = [
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'top' },
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'top' },
    ];
    const positionPanelUp: ConnectedPosition[] = [
      { originX: horizontalAlignment, originY: 'top', overlayX: horizontalAlignment, overlayY: 'bottom' },
      { originX: horizontalAlignment, originY: 'bottom', overlayX: horizontalAlignment, overlayY: 'bottom' },
    ];
    this.positions = [...positionPanelDown, ...positionPanelUp];
  }

  protected isPanelOpensDown(elemRect: DOMRect, panelHeight: number, screenHeight: number): boolean {
    let result = true;
    if (elemRect.top > -1 && elemRect.height > -1 && panelHeight > -1 && screenHeight > -1) {
      const value = NumberUtil.roundTo100(elemRect.top) + NumberUtil.roundTo100(elemRect.height) + panelHeight;
      result = value < screenHeight;
    }
    return result;
  }

  protected setPropertiesForTranslate(panelWrap: HTMLElement | null, elemRect: DOMRect, screenHeight: number): void {
    let translateY: string | null = null;
    if (!!panelWrap && elemRect.top > 0 && elemRect.height > 0) {
      const panel = panelWrap.children[0];
      const panelHeight = panel ? Number(getComputedStyle(panel).getPropertyValue('height').replace('px', '')) : 0;
      const isOpensDown = this.isPanelOpensDown(this.triggerRect, panelHeight, screenHeight);
      translateY = isOpensDown ? '-50%' : '50%';
      HtmlElemUtil.setProperty(HtmlElemUtil.getElementRef(panelWrap), '--glnspw-translate-y', translateY);
    }
  }
}
