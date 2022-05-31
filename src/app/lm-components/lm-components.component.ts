import { Component, ViewEncapsulation } from '@angular/core';

import { EXPANDED_HEIGHT } from 'src/app/lib-core/constants/constants';
import { SiteItem, SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';

@Component({
  selector: 'app-lm-components',
  templateUrl: './lm-components.component.html',
  styleUrls: ['./lm-components.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LmComponentsComponent {
  public expandedHeight = EXPANDED_HEIGHT;
  public itemDataList: SiteItem[] = SiteMenu.getItems('Components');

  constructor() {
    for (let idx = 0; idx < this.itemDataList.length; idx++) {
      this.itemDataList[idx].expanded = false;
    }
    const siteItem: SiteItem | null = SiteMenu.findSiteItemByUrl(this.itemDataList, location.pathname);
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
