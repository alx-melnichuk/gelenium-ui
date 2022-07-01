import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from 'src/app/lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-regex-remove',
  templateUrl: './regex-remove.component.html',
  styleUrls: ['./regex-remove.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexRemoveComponent implements AfterViewInit {
  public showNum = '';

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
