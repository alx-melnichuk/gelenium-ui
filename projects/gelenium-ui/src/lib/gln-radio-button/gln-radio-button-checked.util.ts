import { GlnRadioButton } from './gln-radio-button.interface';

export class GlnRadioButtonCheckedUtil {
  private static list: GlnRadioButton[] = [];
  /** Add to the list of selected items. */
  public static add(value: GlnRadioButton): number {
    GlnRadioButtonCheckedUtil.remove(value);
    return GlnRadioButtonCheckedUtil.list.push(value);
  }
  /** Remove from the list of selected items. */
  public static remove(value: GlnRadioButton): void {
    const index = GlnRadioButtonCheckedUtil.list.indexOf(value);
    if (index > -1) {
      GlnRadioButtonCheckedUtil.list.splice(index, 1);
    }
  }
  /** Return a list of selected items. */
  public static getList(): GlnRadioButton[] {
    return GlnRadioButtonCheckedUtil.list.slice();
  }
  /** Clear the list of selected items. */
  public static clear(): void {
    GlnRadioButtonCheckedUtil.list.length = 0;
  }
  /** Find in the list of selected elements by name. */
  public static findByName(name: string): GlnRadioButton | undefined {
    return GlnRadioButtonCheckedUtil.list.find((item: GlnRadioButton) => item.name === name);
  }
}
