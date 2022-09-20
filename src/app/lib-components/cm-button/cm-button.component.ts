import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';
import { UrlUtil } from '../../lib-core/utils/url.util';

const logLabel = 'ComponentsButton';

@Component({
  selector: 'app-cm-button',
  templateUrl: './cm-button.component.html',
  styleUrls: ['./cm-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmButtonComponent implements AfterViewInit {
  public showNum = '';

  public urlPlButton = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_PALETTE_BUTTON');

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
      console.timeEnd(logLabel); // 1050ms
    });
  }
}
