import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { GlnSize, GlnSizeUtil } from '../_constants/gln-size';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { ScreenUtil } from '../_utils/screen.util';

import { GlnSpinnerConfig } from './gln-spinner-config.interface';

const CSS_PROP_SIZE = '--glnsp--size';
const CSS_PROP_OWNER_LEFT = '--glnspow--left';
const CSS_PROP_OWNER_BOTTOM = '--glnspow--bottom';
const CSS_PROP_OWNER_RIGHT = '--glnspow--right';
const CSS_PROP_OWNER_TOP = '--glnspow--top';

export const GLN_SPINNER_CONFIG = new InjectionToken<GlnSpinnerConfig>('GLN_SPINNER_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-spinner',
  exportAs: 'glnSpinner',
  templateUrl: './gln-spinner.component.html',
  styleUrls: ['./gln-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSpinnerComponent implements OnChanges, OnInit {
  @Input()
  public id = `glnsp-${uniqueIdCounter++}`;
  @Input()
  public config: GlnSpinnerConfig | null | undefined;
  @Input()
  public isExternal: string | boolean | null | undefined;
  @Input()
  public isNoAnimation: string | boolean | null | undefined;
  @Input()
  public isOwner: string | boolean | null | undefined;
  @Input()
  public isScreen: string | boolean | null | undefined;
  @Input()
  public size: string | null | undefined; // GlnSizeType

  public currConfig: GlnSpinnerConfig;
  public isExternalVal: boolean | null = null; // Binding attribute "isExternal".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isOwnerVal: boolean | null = null; // Binding attribute "isOwner"
  public isScreenVal: boolean | null = null; // Binding attribute "isOwner"
  public sizeValue: number = 0;

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_SPINNER_CONFIG) private rootConfig: GlnSpinnerConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-spinner', true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }

    if (changes['isExternal'] || (changes['config'] && this.isExternalVal == null && this.currConfig.isExternal != null)) {
      this.isExternalVal = !!(BooleanUtil.init(this.isExternal) ?? (this.currConfig.isExternal || null));
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimationVal == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
      this.settingNoAnimation(this.isNoAnimationVal);
    }
    if (changes['isOwner'] || (changes['config'] && this.isOwnerVal == null && this.currConfig.isOwner != null)) {
      this.isOwnerVal = !!(BooleanUtil.init(this.isOwner) ?? (this.currConfig.isOwner || null));
      this.settingOwner(this.isOwnerVal);
      const ownerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement);
      this.setCssByElement(HtmlElemUtil.getRect(this.hostRef), HtmlElemUtil.getRect(ownerRef), this.hostRef);
    }
    if (changes['isScreen'] || (changes['config'] && this.isScreenVal == null && this.currConfig.isScreen != null)) {
      this.isScreenVal = !!(BooleanUtil.init(this.isScreen) ?? (this.currConfig.isScreen || null));
      this.settingScreen(this.isScreenVal);
      this.setCssByElement(HtmlElemUtil.getRect(this.hostRef), ScreenUtil.getRect(), this.hostRef);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      this.sizeValue = GlnSizeUtil.getSizeValue(this.size || this.currConfig.size || GlnSize.small.toString());
      this.setCssSize(this.sizeValue, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.isExternalVal == null && this.currConfig.isExternal != null) {
      this.isExternalVal = !!(this.currConfig.isExternal || null);
    }
    if (this.isNoAnimationVal == null && this.currConfig.isNoAnimation != null) {
      this.isNoAnimationVal = !!(this.currConfig.isNoAnimation || null);
      this.settingNoAnimation(this.isNoAnimationVal);
    }
    if (this.isOwnerVal == null && this.currConfig.isOwner != null) {
      this.isOwnerVal = !!(this.currConfig.isOwner || null);
      this.settingOwner(this.isOwnerVal);
      const ownerRef: ElementRef<HTMLElement> | null = HtmlElemUtil.getElementRef(this.hostRef.nativeElement.parentElement);
      this.setCssByElement(HtmlElemUtil.getRect(this.hostRef), HtmlElemUtil.getRect(ownerRef), this.hostRef);
    }
    if (this.isScreenVal == null && this.currConfig.isScreen != null) {
      this.isScreenVal = !!(this.currConfig.isScreen || null);
      this.settingScreen(this.isScreenVal);
      this.setCssByElement(HtmlElemUtil.getRect(this.hostRef), ScreenUtil.getRect(), this.hostRef);
    }
    if (this.sizeValue === 0) {
      this.sizeValue = GlnSizeUtil.getSizeValue(this.currConfig.size || GlnSize.small.toString());
      this.setCssSize(this.sizeValue, this.hostRef);
    }
  }

  public clearEvent(event: Event | null): void {
    event?.stopPropagation();
    console.log(`clearEvent();`); // #
  }

  // ** Public methods **

  // ** Private methods **

  /** Prepare and setting property: 'max-height'. */
  private setCssSize(size: number, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, NumberUtil.str(size > 0 ? size : null)?.concat('px'));
  }

  private setCssByElement(hostRect: DOMRect | null, ownerRect: DOMRect | null, hostRef: ElementRef<HTMLElement>): void {
    if (hostRect != null && ownerRect != null) {
      const bottom: number = hostRect.bottom - ownerRect.bottom;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_OWNER_BOTTOM, NumberUtil.str(bottom)?.concat('px'));
      const left: number = ownerRect.left - hostRect.left;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_OWNER_LEFT, NumberUtil.str(left)?.concat('px'));
      const right: number = hostRect.right - ownerRect.right;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_OWNER_RIGHT, NumberUtil.str(right)?.concat('px'));
      const top: number = ownerRect.top - hostRect.top;
      HtmlElemUtil.setProperty(hostRef, CSS_PROP_OWNER_TOP, NumberUtil.str(top)?.concat('px'));
    }
  }

  private settingNoAnimation(isNoAnimationVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', isNoAnimationVal ? '' : null);
  }

  private settingOwner(isOwnerVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-owner', !!isOwnerVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'flex-size', isOwnerVal ? '' : null);
  }

  private settingScreen(isScreenVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-screen', !!isScreenVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'flex-size', isScreenVal ? '' : null);
  }
}
