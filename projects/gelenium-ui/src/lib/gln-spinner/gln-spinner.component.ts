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

import { GlnSpinnerConfig } from './gln-spinner-config.interface';

const SIZE: { [key: string]: number } = { short: 38, small: 44, middle: 50, wide: 56, large: 62, huge: 68 };
const PROGRESS_MIN = 0;
const PROGRESS_DEFAULT = 0.7;
const PROGRESS_MAX = 1;

const CSS_PROP_CIRCUMFERENCE = '--glnsp--circumference';
const CSS_PROP_NR_RADIUS = '--glnsp--nr-radius';
const CSS_PROP_SIZE = '--glnsp--size';
const CSS_PROP_STROKE_WD = '--glnsp--stroke-wd';
const CSS_PROP_STROKE_DASHOFFSET = '--glnsp--stroke-offset';

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
  public progress: number | null | undefined; // 0 to 1
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide','large','huge'
  @Input()
  public strokeWd: number | null | undefined; // default = size / 10

  public currConfig: GlnSpinnerConfig;
  public isExternalVal: boolean | null = null; // Binding attribute "isExternal".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
  public isNoPulsateVal: boolean | null = null; // Binding attribute "isNoPulsate".
  public progressVal: number | null = null; // Binding attribute "progress".
  public sizeVal: number | null = null; // Binding attribute "size".
  public strokeWdVal: number | null = null; // Binding attribute "strokeWd".

  private circumference: number = 0;
  private normalizedRadius: number = 0;
  private strokeDashoffset: number = 0;

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
    let isProgress = false;
    let isSize = false;
    let isStrokeWd = false;

    if (changes['isExternal'] || (changes['config'] && this.isExternalVal == null && this.currConfig.isExternal != null)) {
      this.isExternalVal = !!(BooleanUtil.init(this.isExternal) ?? (this.currConfig.isExternal || null));
      this.settingExternal(this.isExternalVal, this.renderer, this.hostRef);
    }
    if (changes['isNoAnimation'] || (changes['config'] && this.isNoAnimationVal == null && this.currConfig.isNoAnimation != null)) {
      this.isNoAnimationVal = !!(BooleanUtil.init(this.isNoAnimation) ?? (this.currConfig.isNoAnimation || null));
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (changes['isNoPulsate'] || (changes['config'] && this.isNoPulsateVal == null && this.currConfig.isNoPulsate != null)) {
      this.isNoPulsateVal = !!(BooleanUtil.init(this.isNoPulsate) ?? (this.currConfig.isNoPulsate || null));
      this.settingNoPulsate(this.isNoPulsateVal, this.renderer, this.hostRef);
    }
    if (changes['progress'] || (changes['config'] && this.progressVal == null && this.currConfig.progress != null)) {
      this.progressVal = this.getProgress(this.progress ?? (this.currConfig.progress || null));
      isProgress = true;
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      isSize = true;
    }
    if (changes['strokeWd'] || (changes['config'] && this.strokeWd == null && this.currConfig.strokeWd != null)) {
      this.strokeWdVal = this.setStrokeWd(this.strokeWd || this.currConfig.strokeWd || null, this.sizeVal);
      isStrokeWd = true;
    }

    if (isSize || isStrokeWd) {
      this.updateCssParams(this.sizeVal, this.strokeWdVal, this.hostRef);
    }
    if (isSize || isStrokeWd || isProgress) {
      this.strokeDashoffset = this.setStrokeDashoffset(this.progressVal, this.circumference);
      this.setCssStrokeDashoffset(this.strokeDashoffset, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    let isProgress = false;
    let isSize = false;
    let isStrokeWd = false;

    if (this.isExternalVal == null) {
      this.isExternalVal = !!(this.currConfig.isExternal || null);
      this.settingExternal(this.isExternalVal, this.renderer, this.hostRef);
    }
    if (this.isNoAnimationVal == null) {
      this.isNoAnimationVal = !!(this.currConfig.isNoAnimation || null);
      this.settingNoAnimation(this.isNoAnimationVal, this.renderer, this.hostRef);
    }
    if (this.isNoPulsateVal == null) {
      this.isNoPulsateVal = !!(this.currConfig.isNoPulsate || null);
      this.settingNoPulsate(this.isNoPulsateVal, this.renderer, this.hostRef);
    }
    if (this.progressVal == null) {
      this.progressVal = this.getProgress(this.currConfig.progress || null);
      isProgress = true;
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      isSize = true;
    }
    if (this.strokeWd == null) {
      this.strokeWdVal = this.setStrokeWd(this.currConfig.strokeWd || null, this.sizeVal);
      isStrokeWd = true;
    }

    if (isSize || isStrokeWd) {
      this.updateCssParams(this.sizeVal, this.strokeWdVal, this.hostRef);
    }
    if (isSize || isStrokeWd || isProgress) {
      this.strokeDashoffset = this.setStrokeDashoffset(this.progressVal, this.circumference);
      this.setCssStrokeDashoffset(this.strokeDashoffset, this.hostRef);
    }
  }

  // ** Public methods **

  // ** Private methods **

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private getProgress(value: number | null): number {
    return value != null && PROGRESS_MIN <= value && value <= PROGRESS_MAX ? Math.round(value * 100) / 100 : PROGRESS_DEFAULT;
  }

  private updateCssParams(size: number | null, strokeWd: number | null, elem: ElementRef<HTMLElement>): void {
    const sizeValue: number = size != null && size > 0 ? size : 0;
    const strokeWdValue: number = strokeWd != null && strokeWd > 0 ? strokeWd : 0;
    this.circumference = 0;
    this.normalizedRadius = 0;
    if (sizeValue > 0 && strokeWdValue > 0) {
      this.normalizedRadius = Math.round(((sizeValue - strokeWdValue) / 2) * 100) / 100;
      this.circumference = Math.round(this.normalizedRadius * 2 * Math.PI * 100) / 100;
    }
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (sizeValue > 0 ? sizeValue.toString() : null)?.concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_STROKE_WD, (strokeWdValue > 0 ? strokeWdValue.toString() : null)?.concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_CIRCUMFERENCE, this.circumference.toString().concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_NR_RADIUS, this.normalizedRadius.toString().concat('px'));
    // const strokeArrayMax: number = Math.round(this.normalizedRadius * 10);
    // HtmlElemUtil.setProperty(elem, '--glnsp--stroke-array-max', strokeArrayMax.toString().concat('px'));
    // const strokeArrayMdl: number = Math.round(strokeArrayMax / 2);
    // HtmlElemUtil.setProperty(elem, '--glnsp--stroke-array-mdl', strokeArrayMdl.toString().concat('px'));
    // const strokeOffsetMdl: number = Math.round(-this.normalizedRadius * 0.7426);
    // HtmlElemUtil.setProperty(elem, '--glnsp--stroke-offset-mdl', strokeOffsetMdl.toString().concat('px'));
    // const strokeOffsetMax: number = Math.round(-this.circumference - 1);
    // HtmlElemUtil.setProperty(elem, '--glnsp--stroke-offset-max', strokeOffsetMax.toString().concat('px'));
  }

  private setStrokeWd(strokeWd: number | null, size: number | null): number {
    return strokeWd || (size != null && size > 0 ? Math.round((size / 10) * 100) / 100 : 2);
  }

  private setStrokeDashoffset(progress: number | null, circumference: number): number {
    return progress != null && 0 <= progress && progress <= 1 ? Math.round((circumference - progress * circumference) * 100) / 100 : 0;
  }
  private setCssStrokeDashoffset(strokeDashoffset: number, elem: ElementRef<HTMLElement>): void {
    const strokeDashoffsetStr: string | null = strokeDashoffset > 0 ? strokeDashoffset.toString() : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_STROKE_DASHOFFSET, strokeDashoffsetStr?.toString().concat('px'));
  }

  private settingExternal(isExternalVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-external', !!isExternalVal);
    HtmlElemUtil.setAttr(renderer, elem, 'ext', isExternalVal ? '' : null);
  }

  private settingNoAnimation(isNoAnimationVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-animation', !!isNoAnimationVal);
    HtmlElemUtil.setAttr(renderer, elem, 'noani', isNoAnimationVal ? '' : null);
  }

  private settingNoPulsate(isNoPulsateVal: boolean | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-no-pulsate', !!isNoPulsateVal);
    HtmlElemUtil.setAttr(renderer, elem, 'nopul', isNoPulsateVal ? '' : null);
  }
}
