import { Component, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from '../lib-core/constants';
import { ScrollAfterRoutingUtil } from '../lib-core/utils/scroll-after-routing.util';
import { SiteItem, SiteMenuUtil, SiteUrl } from '../lib-core/utils/site-menu.util';

@Component({
  selector: 'app-lm-palette',
  templateUrl: './lm-palette.component.html',
  styleUrls: ['./lm-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmPaletteComponent {
  public expandedHeight = EXPANDED_HEIGHT;
  public itemDataList: SiteItem[] = SiteMenuUtil.getItems('Palette');

  constructor() {
    for (let idx = 0; idx < this.itemDataList.length; idx++) {
      this.itemDataList[idx].expanded = false;
    }
    const siteItem: SiteItem | null = SiteMenuUtil.findSiteItemByUrl(this.itemDataList, ScrollAfterRoutingUtil.getPathname());
    if (siteItem) {
      siteItem.expanded = true;
    }
  }

  // ** Public methods **

  public trackByItemData(index: number, item: SiteItem): number {
    return item.order;
  }

  public trackByUrlItem(index: number, item: SiteUrl): string {
    return item.url + '#' + item.fragment;
  }
}
