import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { GlnTouchRippleComponent } from '../gln-touch-ripple/gln-touch-ripple.component';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnChipConfig } from './gln-chip-config.interface';

const EXTERIOR: { [key: string]: string } = { outlined: 'outlined', filled: 'filled' };
const SIZE: { [key: string]: number } = { short: 24, little: 28, small: 32, middle: 36, wide: 40 };

const CSS_ATTR_CUR = 'cur';

const CSS_PROP_SIZE = '--glnch--size';
const CSS_PROP_BRD_RD = '--glnch--brd-rd';
const CSS_PROP_ICON_SZ = '--glnch--icon-sz';
const CSS_PROP_ICON_MR_LF = '--glnch--icon-mr-lf';
const CSS_PROP_ICON_MR_RG = '--glnch--icon-mr-rg';

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
export class GlnChipComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
  @Input()
  public id = `glnch-${uniqueIdCounter++}`;
  @Input()
  public config: GlnChipConfig | null | undefined;
  @Input()
  public exterior: string | null | undefined; // 'outlined' | 'filled'
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public isDeletable: string | boolean | null | undefined;
  @Input()
  public isHoverable: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;
  @Input()
  public size: number | string | null | undefined; // 'short','small','middle','wide'

  @Output()
  readonly deleted: EventEmitter<void> = new EventEmitter();
  @Output()
  readonly ripple: EventEmitter<void> = new EventEmitter();

  // @ContentChildren(GlnOrnamentLeftDirective, { descendants: true })
  // public ornamLeftList!: QueryList<GlnOrnamentLeftDirective>;
  // @ContentChildren(GlnOrnamentRightDirective, { descendants: true })
  // public ornamRightList!: QueryList<GlnOrnamentRightDirective>;
  @ViewChild(GlnTouchRippleComponent, { static: false })
  public touchRipple: GlnTouchRippleComponent | null = null;

  public currConfig: GlnChipConfig;
  public exteriorVal: string | null = null; // Binding attribute "exterior".
  public isDisabledVal: boolean | null = null; // Binding attribute "isDisabled".
  public isDeletableVal: boolean | null = null; // Binding attribute "isDeletable".
  public isHoverableVal: boolean | null = null; // Binding attribute "isHoverable".
  public isNoRippleVal: boolean | null = null; // Binding attribute "isNoRipple".
  public sizeVal: number | null = null; // Binding attribute "size".

  constructor(
    private renderer: Renderer2,
    public hostRef: ElementRef<HTMLElement>,
    @Optional() @Inject(GLN_CHIP_CONFIG) private rootConfig: GlnChipConfig | null
  ) {
    this.currConfig = this.rootConfig || {};
    this.renderer.addClass(this.hostRef.nativeElement, 'gln-chip');
  }

  @HostListener('click', ['$event'])
  public rippleTrigger(event: any, eventTarget: any): void {
    // https://github.com/angular/angular/issues/9587 "event.stopImmediatePropagation() called from listeners not working"
    // Added Event.cancelBubble check to make sure there was no call to event.stopImmediatePropagation() in previous handlers.
    if (!!event && !event.cancelBubble && !this.isDisabledVal && this.touchRipple) {
      this.touchRipple.trigger(event);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.currConfig = { ...this.rootConfig, ...this.config };
    }
    if (changes['exterior'] || (changes['config'] && this.exterior == null && this.currConfig.exterior != null)) {
      this.exteriorVal = EXTERIOR[this.exterior || this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    if (changes['isDisabled']) {
      this.isDisabledVal = !!BooleanUtil.init(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.isDisabledVal || false);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabledVal ? '' : null);
    }
    let isCursor: boolean = false;
    if (changes['isDeletable'] || (changes['config'] && this.isDeletable == null && this.currConfig.isDeletable != null)) {
      this.isDeletableVal = BooleanUtil.init(this.isDeletable) ?? !!this.currConfig.isDeletable;
      this.setCssDeletable(this.isDeletableVal, this.renderer, this.hostRef);
      isCursor = true;
    }
    if (changes['isHoverable'] || (changes['config'] && this.isHoverable == null && this.currConfig.isHoverable != null)) {
      this.isHoverableVal = BooleanUtil.init(this.isHoverable) ?? !!this.currConfig.isHoverable;
      this.setCssHoverable(this.isHoverableVal, this.renderer, this.hostRef);
      isCursor = true;
    }
    if (changes['size'] || (changes['config'] && this.size == null && this.currConfig.size != null)) {
      const sizeStr: string = (this.size || this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (isCursor) {
      this.setCssCursor(!!this.isDeletableVal || !!this.isHoverableVal, this.renderer, this.hostRef);
    }
  }

  public ngOnInit(): void {
    // Update ID value if it is missing.
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);

    if (this.exteriorVal == null) {
      this.exteriorVal = EXTERIOR[this.currConfig.exterior || ''] || EXTERIOR['outlined'];
      this.settingExterior(this.exteriorVal, this.renderer, this.hostRef);
    }
    let isCursor: boolean = false;
    if (this.isDeletableVal == null) {
      this.isDeletableVal = !!this.currConfig.isDeletable;
      this.setCssDeletable(this.isDeletableVal, this.renderer, this.hostRef);
      isCursor = true;
    }
    if (this.isHoverableVal == null) {
      this.isHoverableVal = !!this.currConfig.isHoverable;
      this.setCssHoverable(this.isHoverableVal, this.renderer, this.hostRef);
      isCursor = true;
    }
    if (this.sizeVal == null) {
      const sizeStr: string = (this.currConfig.size || '').toString();
      this.sizeVal = this.converSize(sizeStr, SIZE[sizeStr] || SIZE['small']);
      this.setCssSize(this.sizeVal, this.hostRef);
    }

    if (isCursor) {
      this.setCssCursor(!!this.isDeletableVal || !!this.isHoverableVal, this.renderer, this.hostRef);
    }
  }

  public ngAfterContentInit(): void {
    // this.settingOrnamentList(CSS_ATTR_ORN_LF, this.ornamLfAlignVal || '', this.renderer, this.getElements(this.ornamLeftList));
    // const rhombRef: ElementRef<HTMLElement> | undefined = this.ornamRhomb?.hostRef;
    // this.settingOrnamentList(CSS_ATTR_ORN_RG, this.ornamRgAlignVal || '', this.renderer, this.getElements(this.ornamRightList, rhombRef));
  }

  ngAfterViewInit(): void {
    // const crossWidth: number | null = this.ornamCross?.hostRef.nativeElement.clientWidth || null;
    // HtmlElemUtil.setProperty(this.hostRef, CSS_PROP_RIPPLE_RG, crossWidth?.toString().concat('px'));
  }

  public clickDeleted(event: MouseEvent | null | undefined): void {
    event?.stopPropagation();
    this.deleted.emit();
  }

  log(text: string): void {
    console.log(text);
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
    HtmlElemUtil.setProperty(elem, CSS_PROP_SIZE, (size > 0 ? size.toString() : null)?.concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_BRD_RD, (size > 0 ? Math.round((size / 2) * 100) / 100 : null)?.toString().concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_ICON_SZ, (size > 0 ? Math.round(size * 0.672) : null)?.toString().concat('px'));
    const iconMarginLfRg: number | null = size > 0 ? Math.round(size * 0.169) : null;
    HtmlElemUtil.setProperty(elem, CSS_PROP_ICON_MR_LF, iconMarginLfRg?.toString().concat('px'));
    HtmlElemUtil.setProperty(elem, CSS_PROP_ICON_MR_RG, iconMarginLfRg?.toString().concat('px'));
  }
  private setCssHoverable(isHoverable: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setClass(renderer, elem, 'glnch-hoverable', isHoverable);
    HtmlElemUtil.setAttr(renderer, elem, 'hov', isHoverable ? '' : null);
  }
  private setCssCursor(isAdded: boolean, renderer: Renderer2, elem: ElementRef<HTMLElement>): void {
    HtmlElemUtil.setAttr(renderer, elem, CSS_ATTR_CUR, isAdded ? '' : null);
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