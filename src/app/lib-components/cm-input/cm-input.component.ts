import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { RouterConfig } from '../../lib-core/config/router-config';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'ComponentsInput';

@Component({
  selector: 'app-cm-input',
  templateUrl: './cm-input.component.html',
  styleUrls: ['./cm-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmInputComponent implements AfterViewInit {
  public showNum = '';

  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlPlInput = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_INPUT');

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
      console.timeEnd(logLabel); // 600ms - 650ms
    });
  }
}
