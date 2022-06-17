import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { GlnMenuItem } from './grn-menu-item.interface';

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

  @ViewChild('templateRef', { static: true, read: TemplateRef })
  public templateRef!: TemplateRef<unknown>;

  public disabled = false;

  public selected = false;

  public multiple = false;

  // eslint-disable-next-line @typescript-eslint/ban-types
  public contextInfo: Object | null = {};

  public formControl: FormControl = new FormControl();
  public formGroup: FormGroup = new FormGroup({ info: this.formControl });

  constructor(
    public hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    console.log(`GlnMenuItem()`); // TODO del;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      this.disabled = BooleanUtil.value(this.isDisabled);
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', this.disabled);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', this.isDisabled ? '' : null);
    }
    if (changes.label) {
      this.contextInfo = { label: this.label };
    }
  }

  // ** Public API **

  public getLabelOrInnerText(): string | null {
    return this.label || (this.sanitizer.bypassSecurityTrustHtml(this.hostRef.nativeElement.innerHTML) as string);
  }

  public getValue(): unknown | null {
    return this.value || this.label;
  }

  public getMenuItem(): GlnMenuItem {
    return { label: this.getLabelOrInnerText(), value: this.value };
  }

  public setSelected(value: boolean): void {
    if (this.selected !== value) {
      this.selected = value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-selected', this.selected);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'sel', this.selected ? '' : null);
      this.changeDetectorRef.markForCheck();
    }
  }

  public setMultiple(value: boolean): void {
    if (this.multiple !== value) {
      this.multiple = value;
      this.changeDetectorRef.markForCheck();
    }
  }
}
