import { GlnTooltipBaseDirective } from './gln-tooltip-base.directive';

export class GlnTooltipOpenUtil {
  private static list: GlnTooltipBaseDirective<any>[] = [];

  public static add(value: GlnTooltipBaseDirective<any>): number {
    GlnTooltipOpenUtil.remove(value);
    return GlnTooltipOpenUtil.list.push(value);
  }
  public static remove(value: GlnTooltipBaseDirective<any>): void {
    const index = GlnTooltipOpenUtil.list.indexOf(value);
    if (index > -1) {
      GlnTooltipOpenUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnTooltipBaseDirective<any>[] {
    return GlnTooltipOpenUtil.list.slice();
  }
  public static closeAll(): void {
    GlnTooltipOpenUtil.list.forEach((item: { hide(value: unknown): void }) => item.hide({ noAnimation: true }));
  }
}
