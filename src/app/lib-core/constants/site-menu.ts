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
    return result.sort((a: SiteItem, b: SiteItem) => a.order - b.order);
  }
  public static addItem(nameMenu: string, nameItem: string, value: SiteItem | undefined): void {
    if (nameMenu) {
      const siteItemMenu: SiteMenuMap = SiteMenu.getMenu(nameMenu) || SiteMenu.addMenu(nameMenu);
      if (value) {
        siteItemMenu[nameItem] = value;
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
}
