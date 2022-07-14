import { GlnOptionComponent } from '../gln-option/gln-option.component';

/** Class for working with selected options. */
export class GlnSelectedOptions {
  /** List of selected options. */
  public items: GlnOptionComponent[] = [];

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
  public findOptionByValue(value: unknown | null, options: GlnOptionComponent[]): GlnOptionComponent | null {
    let result: GlnOptionComponent | null = null;
    for (let idx = 0; idx < options.length && !result; idx++) {
      result = options[idx].value === value ? options[idx] : result;
    }
    return result;
  }

  public mergeOptions(multiple: boolean, addItems: GlnOptionComponent[], options: GlnOptionComponent[]): GlnOptionComponent[] {
    const result: GlnOptionComponent[] = [];
    if (addItems.length > 0 && options.length > 0) {
      const nextOptions: GlnOptionComponent[] = multiple ? this.items.slice() : [];
      if (multiple) {
        for (let idx = 0; idx < addItems.length; idx++) {
          const addItem = addItems[idx];
          const index = nextOptions.indexOf(addItem);
          if (index > -1) {
            nextOptions.splice(index, 1);
          } else {
            nextOptions.push(addItem);
          }
        }
      } else {
        for (let i = 0; i < addItems.length; i++) {
          nextOptions.push(addItems[i]);
        }
      }
      result.push(...options.filter((item) => nextOptions.includes(item)));
    }
    return result;
  }
  /** Get a list of options according to an array of values. */
  public getOptionsByValues(newValue: unknown | unknown[] | null, options: GlnOptionComponent[]): GlnOptionComponent[] {
    const result: GlnOptionComponent[] = [];
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
  public setSelectionOptions(newItems: GlnOptionComponent[], options: GlnOptionComponent[]): void {
    const currentItems: GlnOptionComponent[] = this.items.slice();
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
