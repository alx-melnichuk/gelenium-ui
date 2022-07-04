import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from '../../../lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-regex-match',
  templateUrl: './regex-match.component.html',
  styleUrls: ['./regex-match.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexMatchComponent implements AfterViewInit {
  public showNum = '';

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
