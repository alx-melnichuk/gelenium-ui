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
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnOption3Component } from './gln-option3.component';
import { GLN_SELECT_SCROLL_STRATEGY } from './gln-select3.providers';

/** Object that can be used to configure the default options for the select module. */
// export interface MatSelectConfig {
//   /** Whether option centering should be disabled. */
//   disableOptionCentering?: boolean;
//   /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
//   typeaheadDebounceInterval?: number;
//   /** Class or list of classes to be applied to the menu's overlay panel. */
//   overlayPanelClass?: string | string[];
// }

let uniqueIdCounter = 0;

const defaultPositions: ConnectedPosition[] = [
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
];

@Component({
  selector: 'gln-select3',
  templateUrl: './gln-select3.component.html',
  styleUrls: ['./gln-select3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSelect3Component implements OnInit, OnChanges {
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
  public isFixRight: string | boolean | null = null;

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
  /** Trigger that opens the select. */
  @ViewChild('trigger', { static: true })
  public trigger!: ElementRef<HTMLElement>;
  /** Overlay pane containing the options. */
  @ViewChild(CdkConnectedOverlay)
  protected connectedOverlay!: CdkConnectedOverlay;

  /** Panel containing the select options. */
  @ViewChild('panel')
  public panel: ElementRef<HTMLElement> | null = null;

  // ** abstract class GlnBasisFrame -v **
  public disabled: boolean | null = null; // Binding attribute "isDisabled".
  public isNoAnimation: boolean | null = null; // Binding attribute "noAnimation".
  public isWriteValueInit: boolean | null = null;
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
  public offsetY = 0;
  public overlayPanelClass: string | string[] = /*this._defaultOptions?.overlayPanelClass ||*/ '';
  public positions: ConnectedPosition[] = [...defaultPositions];
  /** Strategy that will be used to handle scrolling while the select panel is open. */
  public scrollStrategy: ScrollStrategy;
  // /** The value of the select panel's transform-origin property. */
  // public transformOrigin = 'top';
  /** The last measured value for the trigger's client bounding rect. */
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
    if (changes.isRequired) {
      this.required = BooleanUtil.init(this.isRequired);
    }
    if (changes.isValueInit) {
      this.valueInit = BooleanUtil.init(this.isValueInit);
    }
    if (changes.noAnimation) {
      this.isNoAnimation = BooleanUtil.init(this.noAnimation != null ? '' + this.noAnimation : null);
    }
    // ** abstract class GlnBasisFrame -^ **
    if (changes.isFixRight) {
      this.fixRight = !!BooleanUtil.init(this.isFixRight != null ? '' + this.isFixRight : null);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'is-fix-right', !!this.isFixRight);
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  // ** Public methods **

  // ** abstract class GlnBasisFrame -v **
  public getBoolean(value: string | null): boolean | null {
    return BooleanUtil.init(value);
  }
  // ** abstract class GlnBasisFrame -^ **

  public setHasPanelAnimation(isPanelOpen: boolean): void {
    this.hasPanelAnimation = !this.isNoAnimation && !isPanelOpen && this.hasPanelAnimation ? false : this.hasPanelAnimation;
    console.log(`setHasPanelAnimation() hasPanelAnimation=${this.hasPanelAnimation} panel!=null-${this.panel != null}`); // TODO del;
  }
  /** Toggles the overlay panel open or closed. */
  public toggle(): void {
    this.isPanelOpen ? this.close() : this.open();
  }
  /** Opens the overlay panel. */
  public open(): void {
    if (this.isCanOpen()) {
      this.isPanelOpen = true;
      this.hasPanelAnimation = !this.isNoAnimation ? true : this.hasPanelAnimation;
      console.log('hasPanelAnimation=', this.hasPanelAnimation); // TODO del;
      this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
      this.settingPosition(this.fixRight);
      // this._keyManager.withHorizontalOrientation(null);
      // this._highlightCorrectOption();
      console.log(`open() panel!=null-${this.panel != null}`); // TODO del;
      this.changeDetectorRef.markForCheck();
    }
  }

  /** Closes the overlay panel and focuses the host element. */
  public close(): void {
    if (this.isPanelOpen) {
      console.log(`close() panel!=null-${this.panel != null}`); // TODO del;
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

  /** The callback that is called when the overlay panel is attached. */
  public doAttached(): void {
    this.connectedOverlay.positionChange.pipe(take(1)).subscribe(() => {
      let panelHeight = -1;
      if (this.panel) {
        panelHeight = this.getHeight(this.panel);
      }
      console.log(`panelHeight=${panelHeight}`); // TODO del;
      // this.changeDetectorRef.detectChanges();
      // this._positioningSettled();
    });
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
}
