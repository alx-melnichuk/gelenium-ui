import { GlnSnackbarRef } from './gln-snackbar-reference';

export class GlnSnackbarOpenUtil {
  private static list: GlnSnackbarRef<unknown>[] = [];

  public static add(value: GlnSnackbarRef<unknown>): number {
    GlnSnackbarOpenUtil.remove(value);
    return GlnSnackbarOpenUtil.list.push(value);
  }
  public static remove(value: GlnSnackbarRef<unknown>): void {
    const index = GlnSnackbarOpenUtil.list.indexOf(value);
    if (index > -1) {
      GlnSnackbarOpenUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnSnackbarRef<unknown>[] {
    return GlnSnackbarOpenUtil.list.slice();
  }
  public static size(): number {
    return GlnSnackbarOpenUtil.list.length;
  }
  public static closeAll(): void {
    while (GlnSnackbarOpenUtil.list.length > 0) {
      GlnSnackbarOpenUtil.list.pop()?.dismiss({ noAnimation: true });
    }
  }
}
