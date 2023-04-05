import { GlnRadioButton } from './gln-radio-button.interface';

export class GlnRadioButtonCheckedUtil {
  private static list: GlnRadioButton[] = [];

  public static add(value: GlnRadioButton): number {
    const cnt = GlnRadioButtonCheckedUtil.list.length;
    console.log(`GRBCU.add   (id=${value.id}  name=${value.name};  len= ${cnt} + 1 = ${cnt + 1}`); // #
    GlnRadioButtonCheckedUtil.remove(value);
    return GlnRadioButtonCheckedUtil.list.push(value);
  }
  public static remove(value: GlnRadioButton): void {
    const index = GlnRadioButtonCheckedUtil.list.indexOf(value);
    if (index > -1) {
      const cnt = GlnRadioButtonCheckedUtil.list.length;
      console.log(`GRBCU.remove(id=${value.id}  name=${value.name};  len= ${cnt} - 1 = ${cnt - 1}`); // #
      GlnRadioButtonCheckedUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnRadioButton[] {
    return GlnRadioButtonCheckedUtil.list.slice();
  }
  public static clear(): void {
    GlnRadioButtonCheckedUtil.list.length = 0;
  }
  public static findByName(name: string): GlnRadioButton | undefined {
    return GlnRadioButtonCheckedUtil.list.find((item: GlnRadioButton) => item.name === name);
  }
}
