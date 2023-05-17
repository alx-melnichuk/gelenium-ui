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
  public static size(): number {
    return GlnSelectOpenUtil.list.length;
  }
  public static closeAll(): void {
    while (GlnSelectOpenUtil.list.length > 0) {
      GlnSelectOpenUtil.list.pop()?.close({ noAnimation: true });
    }
  }
}
