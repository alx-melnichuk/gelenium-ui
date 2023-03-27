import { GlnSelectComponent } from './gln-select.component';

export class GlnSelectOpenUtil {
  private static list: GlnSelectComponent[] = [];

  public static add(value: GlnSelectComponent): number {
    GlnSelectOpenUtil.remove(value);
    return GlnSelectOpenUtil.list.push(value);
  }
  public static remove(value: GlnSelectComponent): void {
    const index = GlnSelectOpenUtil.list.indexOf(value);
    if (index > -1) {
      GlnSelectOpenUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnSelectComponent[] {
    return GlnSelectOpenUtil.list.slice();
  }
  public static closeAll(): void {
    GlnSelectOpenUtil.list.forEach((item: { close(value: unknown): void }) => item.close({ noAnimation: true }));
  }
}
