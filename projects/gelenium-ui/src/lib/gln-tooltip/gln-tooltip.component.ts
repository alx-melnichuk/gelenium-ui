import { ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

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
  public override text: string | null | undefined = null;
  @Input()
  public override templateRef: TemplateRef<unknown> | null = null;

  @HostBinding('class.gln-tooltip')
  public getClassTooltip(): boolean {
    return true;
  }

  public override isArrow: boolean | null = null;

  constructor() {
    super();
  }
}
