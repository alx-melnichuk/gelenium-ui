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

import { GLN_OPTION_GROUP, GlnOptionGroup } from './gln-option-group.interface';
import { GLN_OPTION_PARENT, GlnOptionParent } from './gln-option-parent.interface';
import { GlnOption } from './gln-option.interface';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-option',
  exportAs: 'glnOption',
  templateUrl: './gln-option.component.html',
  styleUrls: ['./gln-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnOptionComponent implements OnChanges, OnInit, GlnOption {
  @Input()
  public id = `glnop-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public value: unknown | null | undefined;

  @ViewChild('contentRef', { static: true })
  public contentRef!: ElementRef<HTMLElement>;

  public disabled: boolean | null | undefined;
  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ checkinfo: this.formControl });
  public marked = false;
  public selected: boolean | null | undefined;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(GLN_OPTION_PARENT) public parent: GlnOptionParent,
    @Optional() @Inject(GLN_OPTION_GROUP) public group: GlnOptionGroup
  ) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
  }

  @HostListener('click')
  public doClick(): void {
    if (this.parent && !this.disabled) {
      this.parent.setOptionSelected(this);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(this.disabled ?? this.group?.disabled);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    if (this.disabled === undefined) {
      this.setDisabled(this.group?.disabled);
    }
    this.setSelected(!!this.selected);
  }

  // ** Public methods **

  // ** interface GlnOption - start **

  public getTextContent(): string {
    return (this.hostRef.nativeElement.textContent || '').trim();
  }

  public getTrustHtml(): string {
    return (this.contentRef.nativeElement.innerHTML || '').trim();
  }

  public getValue<T>(): T | null | undefined {
    return this.value === null ? null : this.value === undefined ? undefined : (this.value as T);
  }

  /** Check or uncheck disabled. */
  public setDisabled(value: boolean | null | undefined): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', value ? null : '0');
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck marking. */
  public setMarked(value: boolean | null): void {
    if (this.marked !== !!value) {
      this.marked = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', value ? '' : null);
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

  // ** interface GlnOption - finish **
}
