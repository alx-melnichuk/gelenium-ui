import { AfterContentInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from 'src/app/lib-core/constants/constants';
import { SiteItem, SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent implements OnInit, AfterContentInit {
  public expandedHeight = EXPANDED_HEIGHT;
  public itemDataList: SiteItem[] = SiteMenu.getItems('Components');

  constructor() {
    this.updateStatusExpandedByPathname(this.itemDataList);
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.time('LmComponentsComponent');
  }

  ngAfterContentInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('LmComponentsComponent');
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
