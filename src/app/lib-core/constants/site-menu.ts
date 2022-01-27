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

export class SiteMenu {
  public static ORDER_DEFAULT = -1;
  private static objMenu: { [key: string]: SiteMenuMap } = {};
  public static findMenu(nameMenu: string): SiteMenuMap | undefined {
    const result = SiteMenu.objMenu[nameMenu];
    if (nameMenu && !result) {
      console.error(`No value for "${nameMenu}" menu.`);
    }
    return result;
  }
  public static getMenu(nameMenu: string): SiteMenuMap | undefined {
    return SiteMenu.objMenu[nameMenu || SM_NULL];
  }
  public static addMenu(nameMenu: string): SiteMenuMap {
    return (SiteMenu.objMenu[nameMenu || SM_NULL] = {});
  }
  public static removeMenu(nameMenu: string): void {
    if (nameMenu && SiteMenu.getMenu(nameMenu)) {
      delete SiteMenu.objMenu[nameMenu];
    }
  }
  public static getItems(nameMenu: string): SiteItem[] {
    const result: SiteItem[] = [];
    const siteItemMenu: SiteMenuMap = SiteMenu.getMenu(nameMenu) || {};
    for (const nameItem of Object.keys(siteItemMenu)) {
      const siteItem: SiteItem = siteItemMenu[nameItem];
      if (siteItem) {
        result.push(siteItem);
      }
    }
    return SiteMenu.createItems(result.sort((a: SiteItem, b: SiteItem) => a.order - b.order));
  }
  public static addItem(nameMenu: string, nameItem: string, value: Partial<SiteItem> | undefined): void {
    if (nameMenu) {
      const siteItemMenu: SiteMenuMap = SiteMenu.getMenu(nameMenu) || SiteMenu.addMenu(nameMenu);
      if (value) {
        const siteItem: SiteItem | null = SiteMenu.createItem(value);
        if (siteItem) {
          siteItemMenu[nameItem] = siteItem;
        }
      } else {
        SiteMenu.removeItem(nameMenu, nameItem);
      }
    }
  }

  public static removeItem(nameMenu: string, nameItem: string): void {
    const siteItemMenu: SiteMenuMap | undefined = nameMenu ? SiteMenu.getMenu(nameMenu) : undefined;
    if (siteItemMenu && nameItem && Object.keys(siteItemMenu).includes(nameItem)) {
      delete siteItemMenu[nameItem];
    }
  }
  public static createItem(item: Partial<SiteItem>): SiteItem | null {
    let result: SiteItem | null = null;
    if (item) {
      if (!item.label) {
        console.error('no required field "label".');
      } else if (!item.siteUrls) {
        console.error('no required field "siteUrls".');
      } else {
        result = {
          order: item.order || SiteMenu.ORDER_DEFAULT,
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
    let maxOrder = SiteMenu.ORDER_DEFAULT;
    for (const item of siteItems) {
      const dataItem: SiteItem | null = SiteMenu.createItem(item);
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
}
