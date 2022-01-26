import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AnchorScrollerService } from 'src/app/lib-core/services/anchor-scroller.service';

@Component({
  selector: 'app-hint-or-error',
  templateUrl: './hint-or-error.component.html',
  styleUrls: ['./hint-or-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintOrErrorComponent implements AfterViewInit {
  public showNum = '';

  constructor(private anchorScrollerService: AnchorScrollerService) {
    // eslint-disable-next-line no-restricted-syntax
    console.time('HintOrErrorComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('HintOrErrorComponent');
    Promise.resolve().then(() => {
      this.anchorScrollerService.scrollByFragmentFromPath();
    });
  }
}
