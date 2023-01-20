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

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

import { GlnSpinnerConfig } from './gln-spinner-config.interface';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };

const CSS_PROP_SIZE = '--glnsp--size';

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
  public isNoPulsate: string | boolean | null | undefined;
  @Input()
  public size: number | string | null | undefined;

  public currConfig: GlnSpinnerConfig;
  public isExternalVal: boolean | null = null; // Binding attribute "isExternal".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoPulsateVal: boolean | null = null; // Binding attribute "isNoPulsate".
  public sizeVal: number | null = null; // Binding attribute "size".

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
    if (changes['isNoPulsate'] || (changes['config'] && this.isNoPulsateVal == null && this.currConfig.isNoPulsate != null)) {
      this.isNoPulsateVal = !!(BooleanUtil.init(this.isNoPulsate) ?? (this.currConfig.isNoPulsate || null));
      this.settingNoPulsate(this.isNoPulsateVal);
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
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
    if (this.isNoPulsateVal == null && this.currConfig.isNoPulsate != null) {
      this.isNoPulsateVal = !!(this.currConfig.isNoPulsate || null);
      this.settingNoPulsate(this.isNoPulsateVal);
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }
  }

  // ** Public methods **

  // ** Private methods **

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  /** Prepare and setting property: 'max-height'. */
  private setCssSize(size: number, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, NumberUtil.str(size > 0 ? size : null)?.concat('px'));
  }

  private settingNoAnimation(isNoAnimationVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', isNoAnimationVal ? '' : null);
  }

  private settingNoPulsate(isNoPulsateVal: boolean | null): void {
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-pulsate', !!isNoPulsateVal);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'nopul', isNoPulsateVal ? '' : null);
  }
}
