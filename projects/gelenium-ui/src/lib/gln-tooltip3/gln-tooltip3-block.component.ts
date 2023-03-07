import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gln-tooltip3-block',
  exportAs: 'glnTooltip3Block',
  templateUrl: './gln-tooltip3-block.component.html',
  styleUrls: ['./gln-tooltip3-block.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTooltip3BlockComponent implements OnInit, OnDestroy {
  @Input()
  public text: string = 'GlnTooltip3Block';

  constructor() {
    console.log(`GlnTooltip3Block();`); // #
  }

  public ngOnInit(): void {
    console.log(`GlnTooltip3Block.OnInit()`); // #
  }

  public ngOnDestroy(): void {
    console.log(`GlnTooltip3Block.OnDestroy();`); // #
  }
}
