import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-menu-item',
  exportAs: 'glnMenuItem',
  templateUrl: './gln-menu-item.component.html',
  styleUrls: ['./gln-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnMenuItemComponent implements OnChanges, OnInit {
  @Input()
  public id = `glnmi-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public value: unknown | null = null;

  public disabled: boolean | null = null;
  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ info: this.formControl });

  public marked = false;
  public multiple = false;
  public selected: boolean | null = null;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', '-1');
    this.setDisable(!!this.disabled);
    this.setSelected(!!this.selected);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.disabled = BooleanUtil.init(this.isDisabled);
      this.setDisable(this.disabled);
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
  }

  // ** Public API **

  public getTextContent(): string {
    return (this.hostRef.nativeElement.textContent || '').trim();
  }

  public getTrustHtml(): string {
    return this.sanitizer.bypassSecurityTrustHtml(this.hostRef.nativeElement.innerHTML) as string;
  }

  public setDisable(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.disabled ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + this.disabled);
      this.changeDetectorRef.markForCheck();
    }
  }

  public setMarked(value: boolean | null): void {
    if (this.marked !== !!value) {
      this.marked = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-marked', this.marked);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mar', this.marked ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }

  public setMultiple(value: boolean | null): void {
    if (this.multiple !== !!value) {
      this.multiple = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-multiple', this.marked);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'mul', this.marked ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }

  public setSelected(value: boolean | null): void {
    if (this.selected !== !!value) {
      this.selected = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', this.selected);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', this.selected ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-selected', '' + this.selected);
      this.changeDetectorRef.markForCheck();
    }
  }
}
