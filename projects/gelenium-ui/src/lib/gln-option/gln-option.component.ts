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
  public id: string = `glnop-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public value: unknown | null | undefined;

  @ViewChild('contentRef', { static: true })
  public contentRef!: ElementRef<HTMLElement>;

  public get disabled(): boolean | null | undefined {
    return this.innDisabled;
  }
  public set disabled(value: boolean | null | undefined) {
    this.setDisabled(value);
  }
  public get marked(): boolean | null | undefined {
    return this.innMarked;
  }
  public set marked(value: boolean | null | undefined) {
    this.setMarked(value);
  }
  public get selected(): boolean | null | undefined {
    return this.innSelected;
  }
  public set selected(value: boolean | null | undefined) {
    this.setSelected(value);
  }

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ checkinfo: this.formControl });

  private innDisabled: boolean | null | undefined;
  private innMarked: boolean | null | undefined;
  private innSelected: boolean | null | undefined;

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
  public handlerClick(): void {
    if (this.parent && !this.disabled) {
      this.parent.setOptionSelected(this);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      const disabled = BooleanUtil.init(this.isDisabled);
      this.setDisabled(disabled ?? this.group?.disabled);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    if (this.innDisabled === undefined) {
      this.setDisabled(this.group?.disabled);
    }
    this.setMarked(!!this.innMarked);
    this.setSelected(!!this.innSelected);
  }

  // ** Public methods **

  // ** interface GlnOption - start **

  public getTextContent(): string {
    return (this.hostRef.nativeElement.textContent || '').trim();
  }

  public getTrustHtml(): string {
    return (this.contentRef.nativeElement.innerHTML || '').trim();
  }

  // ** interface GlnOption - finish **

  // ** Private methods **

  /** Check or uncheck disabled. */
  private setDisabled(value: boolean | null | undefined): void {
    if (this.innDisabled !== !!value) {
      this.innDisabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
      // Removed "tabindex" attribute because focus was lost when pressing "Tab".
      // HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', value ? null : '0');
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck marking. */
  private setMarked(value: boolean | null | undefined): void {
    if (this.innMarked !== !!value) {
      this.innMarked = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', value ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Check or uncheck selected. */
  private setSelected(value: boolean | null | undefined): void {
    if (this.innSelected !== !!value) {
      this.innSelected = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-selected', '' + !!value);
      this.formControl.setValue(value);
      this.changeDetectorRef.markForCheck();
    }
  }
}
