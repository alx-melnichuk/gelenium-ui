import { GlnAutocompleteComponent } from './gln-autocomplete.component';

export class GlnAutocompleteOpenUtil {
  private static list: GlnAutocompleteComponent[] = [];

  public static add(value: GlnAutocompleteComponent): number {
    GlnAutocompleteOpenUtil.remove(value);
    return GlnAutocompleteOpenUtil.list.push(value);
  }
  public static remove(value: GlnAutocompleteComponent): void {
    const index = GlnAutocompleteOpenUtil.list.indexOf(value);
    if (index > -1) {
      GlnAutocompleteOpenUtil.list.splice(index, 1);
    }
  }
  public static getList(): GlnAutocompleteComponent[] {
    return GlnAutocompleteOpenUtil.list.slice();
  }
  public static closeAll(): void {
    GlnAutocompleteOpenUtil.list.forEach((item: { close(value: unknown): void }) => item.close({ noAnimation: true }));
  }
}
