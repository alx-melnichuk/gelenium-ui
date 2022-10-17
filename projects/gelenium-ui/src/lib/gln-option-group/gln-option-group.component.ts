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
import { GlnOptionGroup, GLN_OPTION_GROUP } from '../gln-option/gln-option-group.interface';
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

let uniqueIdCounter = 0;

@Component({
  selector: 'gln-option-group',
  exportAs: 'glnOptionGroup',
  templateUrl: './gln-option-group.component.html',
  styleUrls: ['./gln-option-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_GROUP, useExisting: GlnOptionGroupComponent }],
})
export class GlnOptionGroupComponent implements OnChanges, OnInit, GlnOptionGroup {
  @Input()
  public id = `glnog-${uniqueIdCounter++}`;
  @Input()
  public isDisabled: string | boolean | null | undefined;
  @Input()
  public label: string | null | undefined;

  public disabled: boolean | null | undefined;

  constructor(public hostRef: ElementRef<HTMLElement>, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'role', 'group');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      this.setDisabled(BooleanUtil.init(this.isDisabled));
    }
  }

  public ngOnInit(): void {
    HtmlElemUtil.updateIfMissing(this.renderer, this.hostRef, 'id', this.id);
    if (this.disabled === null) {
      this.setDisabled(!!this.disabled);
    }
  }

  // ** Public methods **

  /** Check or uncheck disabled. */
  public setDisabled(value: boolean | null): void {
    if (this.disabled !== !!value) {
      this.disabled = !!value;
      HtmlElemUtil.setClass(this.renderer, this.hostRef, 'gln-disabled', !!value);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'dis', value ? '' : null);
      HtmlElemUtil.setAttr(this.renderer, this.hostRef, 'aria-disabled', '' + !!value);
      this.changeDetectorRef.markForCheck();
    }
  }
}
