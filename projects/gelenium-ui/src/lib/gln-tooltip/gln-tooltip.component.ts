import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { GlnTooltipBaseComponent } from './gln-tooltip-base.component';

@Component({
  selector: 'gln-tooltip-cmp',
  exportAs: 'glnTooltipCmp',
  templateUrl: './gln-tooltip.component.html',
  styleUrls: ['./gln-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTooltipComponent extends GlnTooltipBaseComponent {
  @Input()
  public override content: Record<string, unknown> | null = null;
  @Input()
  public override className: string | string[] = '';
  @Input()
  public override text: string | null | undefined = null;
  @Input()
  public override templateRef: TemplateRef<unknown> | null = null;

  @HostBinding('class.gln-tooltip')
  public getClassTooltip(): boolean {
    return true;
  }
  @HostBinding('attr.class')
  public get classList(): string {
    return this.getListClassNames(this.className);
  }

  public override isArrow: boolean | null = null;

  constructor(hostRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef) {
    super(hostRef, changeDetectorRef);
    console.log(`GlnTooltipCmp();`); // #
  }
}
