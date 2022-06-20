import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
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
export class GlnMenuItemComponent implements OnChanges {
  @Input()
  public id = `glnmi-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | null = null;
  @Input()
  public value: unknown | null = null;

  public innDisabled: boolean | null = null;
  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ info: this.formControl });

  public multiple = false;
  public selected = false;

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'id', this.id);
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'option');
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'tabindex', '0');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.innDisabled = BooleanUtil.init(this.isDisabled);
      this.settingDisabled(this.renderer, this.hostRef, !!this.innDisabled);
    }
    if (changes.value) {
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'data-value', String(this.value));
    }
  }

  // ** Public API **

  public getTextContent(): string {
    return this.sanitizer.bypassSecurityTrustHtml((this.hostRef.nativeElement.textContent || '').trim()) as string;
  }

  public setDisable(value: boolean): void {
    if (this.innDisabled !== value) {
      this.innDisabled = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public setMultiple(value: boolean): void {
    if (this.multiple !== value) {
      this.multiple = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  public setSelected(value: boolean): void {
    if (this.selected !== value) {
      this.selected = value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', this.selected);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', this.selected ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }

  private settingDisabled(renderer: Renderer2, elem: ElementRef<HTMLElement>, disabled: boolean): void {
    HtmlElemUtil.setClass(renderer, elem, 'gln-disabled', disabled);
    HtmlElemUtil.setAttr(renderer, elem, 'dis', disabled ? '' : null);
  }
}
