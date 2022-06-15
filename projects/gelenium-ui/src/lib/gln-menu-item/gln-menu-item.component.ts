import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

@Component({
  selector: 'gln-menu-item',
  exportAs: 'glnMenuItem',
  templateUrl: './gln-menu-item.component.html',
  styleUrls: ['./gln-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnMenuItemComponent implements OnChanges {
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public label: string | null = null;
  @Input()
  public value: unknown | null = null;

  @ContentChild('templateRef', { static: true, read: TemplateRef })
  public templateRef!: TemplateRef<unknown>;

  private innDisabled = false;
  public get disabled(): boolean {
    return this.innDisabled;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set disabled(value: boolean) {}

  private innSelected = false;
  public get selected(): boolean {
    return this.innSelected;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set selected(value: boolean) {}

  private innMultiple = false;
  public get multiple(): boolean {
    return this.innMultiple;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set multiple(value: boolean) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  private innContextInfo: Object | null = {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  public get contextInfo(): Object | null {
    return this.innContextInfo;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  public set contextInfo(value: Object | null) {}

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ info: this.formControl });

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    console.log(`GlnMenuItem()`); // TODO del;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.innDisabled = BooleanUtil.value(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.innDisabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes.label) {
      this.innContextInfo = { label: this.label };
    }
  }

  // ** Public API **

  public setSelected(value: boolean): void {
    if (this.innSelected !== value) {
      this.innSelected = value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', this.innSelected);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', this.innSelected ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }

  public setMultiple(value: boolean): void {
    if (this.innMultiple !== value) {
      this.innMultiple = value;
      this.changeDetectorRef.markForCheck();
    }
  }
}
