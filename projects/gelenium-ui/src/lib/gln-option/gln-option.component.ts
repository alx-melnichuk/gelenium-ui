import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

import { GlnOptionParent, GLN_OPTION_PARENT } from './gln-option-parent.interface';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-option',
  exportAs: 'glnOption',
  templateUrl: './gln-option.component.html',
  styleUrls: ['./gln-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnOptionComponent implements OnChanges, OnInit {
  @Input()
  public id = `glno-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public value: unknown | null = null;

  @ViewChild('contentRef', { static: true })
  public contentRef!: ElementRef<HTMLElement>;

  public checkmark = false;
  public disabled: boolean | null = null;
  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ checkinfo: this.formControl });
  public marked = false;
  public multiple = false;
  public selected: boolean | null = null;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_OPTION_PARENT) public parent: GlnOptionParent
  ) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
  }

  @HostListener('click')
  public doClick(): void {
    if (this.parent) {
      this.parent.optionSelection(this);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(disabled);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    this.setMultiple(this.parent?.multiple || null);
    this.setCheckmark(this.parent?.checkmark || null);
    if (this.disabled === null) {
      this.setDisabled(!!this.disabled);
    }
    this.setSelected(!!this.selected);
  }

  // ** Public API **

  public getTextContent(): string {
    return (this.hostRef.nativeElement.textContent || '').trim();
  }

  public getTrustHtml(): string {
    return (this.contentRef.nativeElement.innerHTML || '').trim();
  }
  /** Set or uncheck "checkmark". */
  public setCheckmark(value: boolean | null): void {
    if (this.checkmark !== !!value && (!!value === false || this.multiple)) {
      this.checkmark = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-checkmark', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'che', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Set or uncheck disabled. */
  public setDisabled(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', value ? null : '0');

      this.changeDetectorRef.markForCheck();
    }
  }
  /** Set or uncheck marking. */
  public setMarked(value: boolean | null): void {
    if (this.marked !== !!value) {
      this.marked = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck multiple. */
  public setMultiple(value: boolean | null): void {
    if (this.multiple !== value) {
      this.multiple = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-multiple', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mul', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck selected. */
  public setSelected(value: boolean | null): void {
    if (this.selected !== !!value) {
      this.selected = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-selected', '' + !!value);
      this.formControl.setValue(value);
      this.changeDetectorRef.markForCheck();
    }
  }
}
