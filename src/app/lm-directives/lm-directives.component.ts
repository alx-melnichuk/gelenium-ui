import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from 'src/app/lib-core/constants/constants';
import { SiteItem, SiteMenu, SiteUrl } from 'src/app//lib-core/constants/site-menu';

@Component({
  selector: 'app-lm-directives',
  templateUrl: './lm-directives.component.html',
  styleUrls: ['./lm-directives.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmDirectivesComponent implements OnInit, AfterViewInit {
  public expandedHeight = EXPANDED_HEIGHT;
  public itemDataList: SiteItem[] = SiteMenu.getItems('Directives');

  constructor() {
    this.updateStatusExpandedByPathname(this.itemDataList);
    // eslint-disable-next-line no-restricted-syntax
    console.time('LmDirectivesComponent');
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('LmDirectivesComponent');
  }

  // ** Public API **

  public trackByItemData(index: number, item: SiteItem): number {
    return item.order;
  }

  public trackByUrlItem(index: number, item: SiteUrl): string {
    return item.url + '#' + item.fragment;
  }

  // ** Private API **

  private updateStatusExpandedByPathname(itemDataList: SiteItem[]): void {
    const pathname = location.pathname;
    for (const itemData of itemDataList) {
      const url = itemData.siteUrls.length > 0 ? itemData.siteUrls[0].url : '';
      itemData.expanded = pathname.startsWith(url);
    }
  }
}
