import { Component, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from '../lib-core/constants';
import { SiteItem, SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

@Component({
  selector: 'app-lm-guides',
  templateUrl: './lm-guides.component.html',
  styleUrls: ['./lm-guides.component.scss'],
})
export class LmGuidesComponent {
  public expandedHeight = EXPANDED_HEIGHT;
  public itemDataList: SiteItem[] = SiteMenuUtil.getItems('Guides');

  constructor() {
    for (let idx = 0; idx < this.itemDataList.length; idx++) {
      this.itemDataList[idx].expanded = false;
    }
    const siteItem: SiteItem | null = SiteMenuUtil.findSiteItemByUrl(this.itemDataList, location.pathname);
    if (siteItem) {
      siteItem.expanded = true;
    }
  }

  // ** Public API **

  public trackByItemData(index: number, item: SiteItem): number {
    return item.order;
  }

  public trackByUrlItem(index: number, item: SiteUrl): string {
    return item.url + '#' + item.fragment;
  }
}
