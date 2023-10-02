import { GlnDatepickerComponent } from './gln-datepicker.component';

export class GlnDatepickerOpenUtil {
  private static list: GlnDatepickerComponent[] = [];

  public static add(value: GlnDatepickerComponent): number {
    GlnDatepickerOpenUtil.remove(value);
    return GlnDatepickerOpenUtil.list.push(value);
  }
  public static remove(value: GlnDatepickerComponent): void {
    const index = GlnDatepickerOpenUtil.list.indexOf(value);
    if (index > -1) {
      GlnDatepickerOpenUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnDatepickerComponent[] {
    return GlnDatepickerOpenUtil.list.slice();
  }
  public static size(): number {
    return GlnDatepickerOpenUtil.list.length;
  }
  public static closeAll(): void {
    while (GlnDatepickerOpenUtil.list.length > 0) {
      GlnDatepickerOpenUtil.list.pop()?.close({ noAnimation: true });
    }
  }
}
