import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnChipConfig } from './gln-chip-config.interface';

const EXTERIOR: { [key: string]: string } = { outlined: 'outlined', filled: 'filled' };
const SIZE: { [key: string]: number } = { short: 24, little: 28, small: 32, middle: 36, wide: 40 };

const CSS_PROP_SIZE = '--glnch--size';
const CSS_PROP_BRD_RD = '--glnch--brd-rd';
const CSS_PROP_ICON_SZ = '--glnch--icon-sz';

export const GLN_CHIP_CONFIG = new InjectionToken<GlnChipConfig>('GLN_CHIP_CONFIG');

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-chip',
  exportAs: 'glnChip',
  templateUrl: './gln-chip.component.html',
  styleUrls: ['./gln-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnChipComponent implements OnChanges, OnInit {
  @Input()
  public id = `glnch-${uniqueIdCounter++}`;
  @Input()
  public config: GlnChipConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // 'outlined' | 'filled'
  @Input()
  public isDeletable: string | boolean | null | undefined;
  @Input()
  public isHoverable: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide'

  // Deletable
  @Output()
  readonly deleted: EventEmitter<void> = new EventEmitter();

  public currConfig: GlnChipConfig;
  public exteriorVal: string | null = null; // Binding attribute "exterior".
  public isDeletableVal: boolean | null = null; // Binding attribute "isDeletable".
  public isHoverableVal: boolean | null = null; // Binding attribute "isHoverable".
  public sizeVal: number | null = null; // Binding attribute "size".

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_CHIP_CONFIG) private rootConfig: GlnChipConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-chip');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['exterior'] || (changes['config'] && this.exterior == null && this.currConfig.exterior != null)) {
      this.exteriorVal = EXTERIOR[this.exterior || this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    if (changes['isDeletable'] || (changes['config'] && this.isDeletable == null && this.currConfig.isDeletable != null)) {
      this.isDeletableVal = BooleanUtil.init(this.isDeletable) ?? !!this.currConfig.isDeletable;
      this.setCssDeletable(this.isDeletableVal, this.renderer, this.hostRef);
    }
    if (changes['isHoverable'] || (changes['config'] && this.isHoverable == null && this.currConfig.isHoverable != null)) {
      this.isHoverableVal = BooleanUtil.init(this.isHoverable) ?? !!this.currConfig.isHoverable;
      this.setCssHoverable(this.isHoverableVal, this.renderer, this.hostRef);
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

    if (this.exteriorVal == null) {
      this.exteriorVal = EXTERIOR[this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    if (this.isDeletableVal == null) {
      this.isDeletableVal = !!this.currConfig.isDeletable;
      this.setCssDeletable(this.isDeletableVal, this.renderer, this.hostRef);
    }
    if (this.isHoverableVal == null) {
      this.isHoverableVal = !!this.currConfig.isHoverable;
      this.setCssHoverable(this.isHoverableVal, this.renderer, this.hostRef);
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }
  }

  public clickDeleted(): void {
    this.deleted.emit();
  }

  // ** Private methods **

  private converSize(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseFloat(size);
    return !Number.isNaN(sizeNum) && sizeNum > 0 ? sizeNum : defaultValue;
  }

  private setCssDeletable(isDeletable: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnch-deletable', isDeletable);
    HtmlElemUtil.setAttr(renderer, elem, 'del', isDeletable ? '' : null);
  }
  private setCssSize(size: number, elem: ElementRef<HTMLElement>): void {
    if (size > 0) {
      HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
      const radius: number = Math.round((size / 2) * 100) / 100;
      HtmlElemUtil.setProperty(elem, CSS_PROP_BRD_RD, radius.toString().concat('px'));
      const iconSize: number = Math.round(size * 0.672);
      // 24 - 16   24*0.66=15,84    24*0.67=16,08  24*0.672=16,128 -16px 24*0,686=16,464 - 16
      // 28 - 19   28*0.66=18,48    28*0.67=18,76  28*0.672=18,816 -19px 28*0,686=18,928 - 19
      // 32 - 22   32*0.66=21,12    32*0.67=21,44  32*0.672=21,504 -22px 32*0,686=21,952 - 22
      // 36 - 25   36*0.66=23,76    36*0.67=24,12  36*0.672=24,192 -24px 36*0,686=24,696 - 25
      // 40 - 28   40*0.66=26,4     40*0.67=26,8   40*0.672=26,88  -27px 40*0.686=27,44  - 27
      HtmlElemUtil.setProperty(elem, CSS_PROP_ICON_SZ, iconSize.toString().concat('px'));
    }
  }
  private setCssHoverable(isHoverable: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnch-hoverable', isHoverable);
    HtmlElemUtil.setAttr(renderer, elem, 'hov', isHoverable ? '' : null);
  }

  private settingExterior(exteriorVal: string | null, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    const isOutlined = exteriorVal === EXTERIOR['outlined'];
    HtmlElemUtil.setClass(renderer, elem, 'glnch-outlined', isOutlined);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-o', isOutlined ? '' : null);
    const isFilled = exteriorVal === EXTERIOR['filled'];
    HtmlElemUtil.setClass(renderer, elem, 'glnch-filled', isFilled);
    HtmlElemUtil.setAttr(renderer, elem, 'ext-f', isFilled ? '' : null);
  }
}
