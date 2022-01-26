import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AnchorScrollerService } from 'src/app/lib-core/services/anchor-scroller.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements AfterViewInit {
  public showNum = '';

  constructor(private anchorScrollerService: AnchorScrollerService) {
    // eslint-disable-next-line no-restricted-syntax
    console.time('InfiniteScrollComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('InfiniteScrollComponent');
    Promise.resolve().then(() => {
      this.anchorScrollerService.scrollByFragmentFromPath();
    });
  }
}
