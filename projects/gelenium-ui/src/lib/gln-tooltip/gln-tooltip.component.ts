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

  public isArrow: boolean | null = null;
  public position: string | null = null;
  public alignment: string | null = null;

  constructor() {
    super();
  }

  public override setOption(options: Record<string, unknown>): void {
    this.isArrow = options['isArrow'] != null ? !!options['isArrow'] : this.isArrow;
    this.position = options['pos'] != null ? (options['pos'] as string) : this.position;
    this.alignment = options['alg'] != null ? (options['alg'] as string) : this.alignment;
  }
}
