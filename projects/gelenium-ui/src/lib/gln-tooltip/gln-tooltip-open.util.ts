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
  public static size(): number {
    return GlnTooltipOpenUtil.list.length;
  }
  public static closeAll(): void {
    while (GlnTooltipOpenUtil.list.length > 0) {
      GlnTooltipOpenUtil.list.pop()?.hide({ noAnimation: true });
    }
  }
}
