import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from '../../../lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-button2',
  templateUrl: './button2.component.html',
  styleUrls: ['./button2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button2Component implements AfterViewInit {
  public showNum = '';

  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('Button2Component');
  }

  public ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('Button2Component');
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
