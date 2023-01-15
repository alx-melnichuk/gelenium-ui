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

import { GlnSpinnerConfig } from './gln-spinner-config.interface';

const CSS_PROP_SIZE = '--glnsp--size';

export const GLN_SPINNER_CONFIG = new InjectionToken<GlnSpinnerConfig>('GLN_SPINNER_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-spinner',
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
  public size: string | null | undefined; // GlnSizeType

  public currConfig: GlnSpinnerConfig;
  public isExternalVal: boolean | null = null; // Binding attribute "isExternal".
  public isNoAnimationVal: boolean | null = null; // Binding attribute "isNoAnimation".
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
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = this.size || this.currConfig.size || GlnSize.small.toString();
      this.sizeValue = GlnSizeUtil.getSizeValue(sizeStr);
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
    if (this.sizeValue === 0) {
      this.sizeValue = GlnSizeUtil.getSizeValue(this.currConfig.size);
      this.setCssSize(this.sizeValue, this.hostRef);
    }
  }

  // ** Public methods **

  // ** Private methods **

  /** Prepare and setting property: 'max-height'. */
  private setCssSize(size: number, elem: ElementRef<HTMLElement> | null): void {
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, NumberUtil.str(size > 0 ? size : null)?.concat('px'));
  }

  private settingNoAnimation(noAnimation: boolean | null): void {
    this.isNoAnimationVal = noAnimation;
    HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-no-animation', !!noAnimation);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'noani', noAnimation ? '' : null);
  }
}
