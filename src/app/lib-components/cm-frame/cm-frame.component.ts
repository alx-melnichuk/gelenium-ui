import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';

import { RouterConfig } from '../../lib-core/config/router-config';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

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

  public baseRef: string = RouterConfig.get('BASE_REF');
  public urlCmFrame = this.baseRef + '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlPlInput = this.baseRef + '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_INPUT');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
  }

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
    // The zone will become stable when all components have fully rendered.
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.timeEnd(logLabel); // 1000ms
    });
  }
}
