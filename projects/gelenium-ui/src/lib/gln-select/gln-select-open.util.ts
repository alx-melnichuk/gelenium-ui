import { GlnSelectComponent } from './gln-select.component';

export class GlnSelectOpenUtil {
  private static selectList: GlnSelectComponent[] = [];

  public static add(value: GlnSelectComponent): number {
    GlnSelectOpenUtil.remove(value);
    return GlnSelectOpenUtil.selectList.push(value);
  }
  public static remove(value: GlnSelectComponent): void {
    const index = GlnSelectOpenUtil.selectList.indexOf(value);
    if (index > -1) {
      GlnSelectOpenUtil.selectList.splice(index, 1);
    }
  }
  public static getSelectList(): GlnSelectComponent[] {
    return GlnSelectOpenUtil.selectList.slice();
  }
  public static closeAll(): void {
    GlnSelectOpenUtil.selectList.forEach((item: { close(value: unknown): void }) => item.close({ noAnimation: true }));
  }
}
