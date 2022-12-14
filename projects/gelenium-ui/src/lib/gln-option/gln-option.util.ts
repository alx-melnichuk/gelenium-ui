import { GlnOption } from './gln-option.interface';

export class GlnOptionUtil {
  public static setSelected(options: GlnOption[], isSelected: boolean): number {
    let result = 0;
    for (let idx = 0; idx < options.length; idx++) {
      const option = options[idx];
      if (option.selected !== isSelected) {
        option.selected = isSelected;
        result++;
      }
    }
    return result;
  }
  public static findByValue(options: GlnOption[], value: unknown | null): GlnOption | null {
    let result: GlnOption | null = null;
    for (let idx = 0; idx < options.length && !result; idx++) {
      result = options[idx].value === value ? options[idx] : result;
    }
    return result;
  }
  /** Get a list of values for all selected options. */
  public static getValues(options: GlnOption[]): unknown[] {
    const result: unknown[] = Array(options.length);
    for (let idx = 0; idx < options.length; idx++) {
      result[idx] = options[idx].value;
    }
    return result;
  }
  /** Get a list of options according to an array of values. */
  public static getOptionsByValues(newValue: unknown | unknown[] | null, options: GlnOption[]): GlnOption[] {
    const result: GlnOption[] = [];
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
  /** Get the height of the option element based on the font size and line height. */
  public static getHeightOption(fontSize: number, lineHeight: number): number {
    return fontSize > 0 && lineHeight > 0 ? lineHeight + 2 * 0.375 * fontSize : 0;
  }
}
