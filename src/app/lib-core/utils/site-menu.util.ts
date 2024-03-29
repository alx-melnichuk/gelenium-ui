export interface SiteUrl {
  label: string;
  url: string;
  fragment: string;
}

export interface SiteItem {
  order: number;
  expanded: boolean;
  label: string;
  siteUrls: SiteUrl[];
}

export interface SiteMenuMap {
  [key: string]: SiteItem;
}

export const SM_NULL = 'null';

export class SiteMenuUtil {
  public static ORDER_DEFAULT = -1;
  private static objMenu: { [key: string]: SiteMenuMap } = {};

  public static findMenu(nameMenu: string): SiteMenuMap | undefined {
    const result = SiteMenuUtil.objMenu[nameMenu];
    if (nameMenu && !result) {
      throw new Error(`No value for "${nameMenu}" menu.`);
    }
    return result;
  }
  public static getMenu(nameMenu: string): SiteMenuMap | undefined {
    return SiteMenuUtil.objMenu[nameMenu || SM_NULL];
  }
  public static addMenu(nameMenu: string): SiteMenuMap {
    return (SiteMenuUtil.objMenu[nameMenu || SM_NULL] = {});
  }
  public static removeMenu(nameMenu: string): void {
    if (nameMenu && SiteMenuUtil.getMenu(nameMenu)) {
      delete SiteMenuUtil.objMenu[nameMenu];
    }
  }
  public static getItems(nameMenu: string): SiteItem[] {
    const result: SiteItem[] = [];
    const siteItemMenu: SiteMenuMap = SiteMenuUtil.getMenu(nameMenu) || {};
    for (const nameItem of Object.keys(siteItemMenu)) {
      const siteItem: SiteItem = siteItemMenu[nameItem];
      if (siteItem) {
        result.push(siteItem);
      }
    }
    return SiteMenuUtil.createItems(result.sort((a: SiteItem, b: SiteItem) => a.order - b.order));
  }
  public static addItem(nameMenu: string, nameItem: string, value: Partial<SiteItem> | undefined): void {
    if (nameMenu) {
      const siteItemMenu: SiteMenuMap = SiteMenuUtil.getMenu(nameMenu) || SiteMenuUtil.addMenu(nameMenu);
      if (value) {
        const siteItem: SiteItem | null = SiteMenuUtil.createItem(value);
        if (siteItem) {
          siteItemMenu[nameItem] = siteItem;
        }
      } else {
        SiteMenuUtil.removeItem(nameMenu, nameItem);
      }
    }
  }

  public static removeItem(nameMenu: string, nameItem: string): void {
    const siteItemMenu: SiteMenuMap | undefined = nameMenu ? SiteMenuUtil.getMenu(nameMenu) : undefined;
    if (siteItemMenu && nameItem && Object.keys(siteItemMenu).includes(nameItem)) {
      delete siteItemMenu[nameItem];
    }
  }
  public static createItem(item: Partial<SiteItem>): SiteItem | null {
    let result: SiteItem | null = null;
    if (item) {
      if (!item.label) {
        throw new Error('no required field "label".');
      } else if (!item.siteUrls) {
        throw new Error('no required field "siteUrls".');
      } else {
        result = {
          order: item.order || SiteMenuUtil.ORDER_DEFAULT,
          expanded: item.expanded != null ? item.expanded : false,
          label: item.label,
          siteUrls: item.siteUrls,
        };
      }
    }
    return result;
  }
  public static createItems(siteItems: SiteItem[] = []): SiteItem[] {
    const result: SiteItem[] = [];
    const buff: SiteItem[] = [];
    let maxOrder = SiteMenuUtil.ORDER_DEFAULT;
    for (const item of siteItems) {
      const dataItem: SiteItem | null = SiteMenuUtil.createItem(item);
      if (!dataItem) continue;
      if (item.order > 0) {
        result.push(dataItem);
        maxOrder = item.order > maxOrder ? item.order : maxOrder;
      } else {
        buff.push(dataItem);
      }
    }
    if (buff.length > 0) {
      const bufItem = buff.sort((itemA: SiteItem, itemB: SiteItem) => itemA.label.localeCompare(itemB.label));
      for (const item of bufItem) {
        result.push({ ...item, ...{ order: ++maxOrder } });
      }
    }
    return result;
  }
  public static findSiteItemByUrl(siteItems: SiteItem[], urlData: string): SiteItem | null {
    let result: SiteItem | null = null;
    for (let idx = 0; idx < siteItems.length && !result; idx++) {
      const item = siteItems[idx];
      const url = item.siteUrls.length > 0 ? item.siteUrls[0].url : '';
      if (url === urlData) {
        result = item;
      }
    }
    return result;
  }
}
