import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
  public override text: string = '';

  @HostBinding('class.gln-tooltip')
  public getClassTooltip(): boolean {
    return true;
  }

  constructor(hostRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef) {
    super(hostRef, changeDetectorRef);
    console.log(`GlnTooltipCmp();`); // #
  }
}
