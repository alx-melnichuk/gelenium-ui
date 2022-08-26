import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';
import { UrlUtil } from '../../lib-core/utils/url.util';

const logLabel = 'ComponentsFrame';

@Component({
  selector: 'app-cm-frame',
  templateUrl: './cm-frame.component.html',
  styleUrls: ['./cm-frame.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmFrameComponent implements AfterViewInit {
  public showNum = '';

  public urlPlSelect = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_SELECT');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
  }

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
    // The zone will become stable when all components have fully rendered.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.timeEnd(logLabel); // 1000ms
    });
  }
}
