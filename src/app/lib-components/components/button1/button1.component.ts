import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from '../../../lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-button1',
  templateUrl: './button1.component.html',
  styleUrls: ['./button1.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button1Component implements AfterViewInit {
  public showNum = '';

  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('Button1Component');
  }

  public ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('Button1Component');
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
