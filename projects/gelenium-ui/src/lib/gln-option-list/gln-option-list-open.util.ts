import { GlnOptionListComponent } from './gln-option-list.component';

export class GlnOptionListOpenUtil {
  private static optionListBuff: GlnOptionListComponent[] = [];

  public static add(value: GlnOptionListComponent): number {
    GlnOptionListOpenUtil.remove(value);
    return GlnOptionListOpenUtil.optionListBuff.push(value);
  }
  public static remove(value: GlnOptionListComponent): void {
    const index = GlnOptionListOpenUtil.optionListBuff.indexOf(value);
    if (index > -1) {
      GlnOptionListOpenUtil.optionListBuff.splice(index, 1);
    }
  }
  public static getList(): GlnOptionListComponent[] {
    return GlnOptionListOpenUtil.optionListBuff.slice();
  }
  public static closeAll(): void {
    GlnOptionListOpenUtil.optionListBuff.forEach((item: { close(value: unknown): void }) => item.close({ noAnimation: true }));
  }
}
