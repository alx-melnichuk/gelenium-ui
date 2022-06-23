import { GlnMenuItemComponent } from '../gln-menu-item/gln-menu-item.component';

/** Class for working with selected menu items. */
export class GlnSelectedMenuItems {
  /** List of selected menu items. */
  public items: GlnMenuItemComponent[] = [];
  /** Indicates that the list of selected menu items is empty. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }
  /** The number of items in the list of selected menu items. */
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
  /** Update the list of selected menu items according to the specified items. */
  public updateByElements(multiple: boolean, updateMenuItems: GlnMenuItemComponent[], menuItems: GlnMenuItemComponent[]): boolean {
    let countAdd = 0;
    let countDelete = 0;
    if (updateMenuItems.length > 0 && menuItems.length > 0) {
      const nextMenuItems: GlnMenuItemComponent[] = this.items.slice();
      if (multiple) {
        for (let idx = 0; idx < updateMenuItems.length; idx++) {
          const updateMenuItem = updateMenuItems[idx];
          const index = nextMenuItems.indexOf(updateMenuItem);
          if (index > -1) {
            updateMenuItem.setSelected(false);
            nextMenuItems.splice(index, 1);
            countAdd++;
          } else {
            updateMenuItem.setSelected(true);
            nextMenuItems.push(updateMenuItem);
            countDelete++;
          }
        }
      } else {
        for (let i = 0; i < nextMenuItems.length; i++) {
          nextMenuItems[i].setSelected(false);
          countDelete++;
        }
        nextMenuItems.length = 0;
        if (updateMenuItems.length > 0 && updateMenuItems[0].value !== null) {
          updateMenuItems[0].setSelected(true);
          nextMenuItems.push(updateMenuItems[0]);
          countAdd++;
        }
      }
      this.items = menuItems.filter((item) => nextMenuItems.includes(item));
    }
    return countAdd > 0 || countDelete > 0;
  }
  /** Get a list of menu items according to an array of values. */
  public findMenuItems(values: unknown[], list: GlnMenuItemComponent[]): GlnMenuItemComponent[] {
    const result: GlnMenuItemComponent[] = [];
    const buff = values.slice();
    for (let idx = 0; idx < list.length && buff.length > 0; idx++) {
      const index = buff.indexOf(list[idx].value);
      if (index > -1) {
        result.push(list[idx]);
        buff.splice(index, 1);
      }
    }
    return result;
  }
}
