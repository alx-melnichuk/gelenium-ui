import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'DirectivesRegexCheck';

@Component({
  selector: 'app-dr-regex-check',
  templateUrl: './dr-regex-check.component.html',
  styleUrls: ['./dr-regex-check.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrRegexCheckComponent implements AfterViewInit {
  public showNum = '';

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
      console.timeEnd(logLabel);
    });
  }
}
