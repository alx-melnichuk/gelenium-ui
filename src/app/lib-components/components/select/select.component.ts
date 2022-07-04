import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from '../../../lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements AfterViewInit {
  public showNum = '';

  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('SelectComponent');
  }

  public ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('SelectComponent');
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
