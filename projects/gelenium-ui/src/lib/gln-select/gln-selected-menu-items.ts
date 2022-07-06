import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';

/** Class for working with selected menu items. */
export class GlnSelectedMenuItems {
  /** List of selected menu items. */
  public items: GlnMenuItemComponent[] = [];

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get length(): number {
    return this.items.length;
  }
  /** Clear the list of selected menu items. */
  public clear(): void {
    if (this.items.length > 0) {
      for (let idx = 0; idx < this.items.length; idx++) {
        this.items[idx].setSelected(false);
      }
      this.items.length = 0;
    }
  }
  /** Get a list of values for all selected menu items. */
  public getValues(): unknown[] {
    const result: unknown[] = Array(this.items.length);
    for (let idx = 0; idx < this.items.length; idx++) {
      result[idx] = this.items[idx].value;
    }
    return result;
  }
  /** Get the menu item by the specified value. */
  public findMenuItemByValue(value: unknown | null, menuList: GlnMenuItemComponent[]): GlnMenuItemComponent | null {
    let result: GlnMenuItemComponent | null = null;
    for (let idx = 0; idx < menuList.length && !result; idx++) {
      result = menuList[idx].value === value ? menuList[idx] : result;
    }
    return result;
  }

  public mergeMenuItems(multiple: boolean, addItems: GlnMenuItemComponent[], menuList: GlnMenuItemComponent[]): GlnMenuItemComponent[] {
    const result: GlnMenuItemComponent[] = [];
    if (addItems.length > 0 && menuList.length > 0) {
      const nextMenuItems: GlnMenuItemComponent[] = multiple ? this.items.slice() : [];
      if (multiple) {
        for (let idx = 0; idx < addItems.length; idx++) {
          const addItem = addItems[idx];
          const index = nextMenuItems.indexOf(addItem);
          if (index > -1) {
            nextMenuItems.splice(index, 1);
          } else {
            nextMenuItems.push(addItem);
          }
        }
      } else {
        for (let i = 0; i < addItems.length; i++) {
          nextMenuItems.push(addItems[i]);
        }
      }
      result.push(...menuList.filter((item) => nextMenuItems.includes(item)));
    }
    return result;
  }
  /** Get a list of menu items according to an array of values. */
  public getMenuItemsByValues(newValue: unknown | unknown[] | null, menuList: GlnMenuItemComponent[]): GlnMenuItemComponent[] {
    const result: GlnMenuItemComponent[] = [];
    const values: unknown[] = Array.isArray(newValue) ? newValue : [newValue];
    const buff = values.slice();
    for (let idx = 0; idx < menuList.length && buff.length > 0; idx++) {
      const index = buff.indexOf(menuList[idx].value);
      if (index > -1) {
        result.push(menuList[idx]);
        buff.splice(index, 1);
      }
    }
    return result;
  }
  /** Set the selected menu items to the new list of items. */
  public setSelectionMenuItems(newItems: GlnMenuItemComponent[], menuList: GlnMenuItemComponent[]): void {
    const currentItems: GlnMenuItemComponent[] = this.items.slice();
    for (let idx = 0; idx < newItems.length; idx++) {
      const newItem = newItems[idx];
      const index = currentItems.indexOf(newItem);
      if (index > -1) {
        currentItems.splice(index, 1);
      } else {
        newItem.setSelected(true);
      }
    }
    for (let i = 0; i < currentItems.length; i++) {
      currentItems[i].setSelected(false);
    }
    this.items = menuList.filter((menu) => newItems.includes(menu));
  }
}
