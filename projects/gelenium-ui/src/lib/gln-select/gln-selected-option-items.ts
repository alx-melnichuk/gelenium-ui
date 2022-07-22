import { GlnOptionItem } from '../gln-option/gln-option-parent.interface';

/** Class for working with selected options. */
export class GlnSelectedOptionItems<T extends GlnOptionItem> {
  /** List of selected options. */
  public items: T[] = [];

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get length(): number {
    return this.items.length;
  }
  /** Clear the list of selected options. */
  public clear(): void {
    if (this.items.length > 0) {
      for (let idx = 0; idx < this.items.length; idx++) {
        this.items[idx].setSelected(false);
      }
      this.items.length = 0;
    }
  }
  /** Get a list of values for all selected options. */
  public getValues(): unknown[] {
    const result: unknown[] = Array(this.items.length);
    for (let idx = 0; idx < this.items.length; idx++) {
      result[idx] = this.items[idx].value;
    }
    return result;
  }
  /** Get the option by the specified value. */
  public findOptionByValue(value: unknown | null, options: T[]): T | null {
    let result: T | null = null;
    for (let idx = 0; idx < options.length && !result; idx++) {
      result = options[idx].value === value ? options[idx] : result;
    }
    return result;
  }

  public mergeOptions(multiple: boolean, addItems: T[]): { added: T[]; deleted: T[]; current: T[] } {
    const added: T[] = [];
    const deleted: T[] = [];
    const current: T[] = multiple ? this.items.slice() : [];
    if (addItems.length > 0) {
      if (multiple) {
        for (let idx = 0; idx < addItems.length; idx++) {
          const addItem = addItems[idx];
          const index = current.indexOf(addItem);
          if (index > -1) {
            deleted.push(...current.splice(index, 1));
          } else {
            current.push(addItem);
            added.push(addItem);
          }
        }
      } else {
        for (let i = 0; i < addItems.length; i++) {
          current.push(addItems[i]);
          added.push(addItems[i]);
        }
      }
    }
    return { added, deleted, current };
  }
  /** Get a list of options according to an array of values. */
  public getOptionsByValues(newValue: unknown | unknown[] | null, options: T[]): T[] {
    const result: T[] = [];
    const values: unknown[] = Array.isArray(newValue) ? newValue : [newValue];
    const buff = values.slice();
    for (let idx = 0; idx < options.length && buff.length > 0; idx++) {
      const index = buff.indexOf(options[idx].value);
      if (index > -1) {
        result.push(options[idx]);
        buff.splice(index, 1);
      }
    }
    return result;
  }
  /** Set the selected options to the new list of items. */
  public setSelectionOptions(newItems: T[], options: T[]): void {
    const currentItems: T[] = this.items.slice();
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
    this.items = options.filter((option) => newItems.includes(option));
  }
}
