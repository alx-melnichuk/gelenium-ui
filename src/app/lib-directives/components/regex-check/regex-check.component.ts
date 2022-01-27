import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from 'src/app/lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-regex-check',
  templateUrl: './regex-check.component.html',
  styleUrls: ['./regex-check.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexCheckComponent implements AfterViewInit {
  public showNum = '';

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
