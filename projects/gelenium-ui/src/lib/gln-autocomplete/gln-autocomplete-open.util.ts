import { GlnAutocompleteComponent } from './gln-autocomplete.component';

export class GlnAutocompleteOpenUtil {
  private static autocompleteList: GlnAutocompleteComponent[] = [];

  public static add(value: GlnAutocompleteComponent): number {
    GlnAutocompleteOpenUtil.remove(value);
    return GlnAutocompleteOpenUtil.autocompleteList.push(value);
  }
  public static remove(value: GlnAutocompleteComponent): void {
    const index = GlnAutocompleteOpenUtil.autocompleteList.indexOf(value);
    if (index > -1) {
      GlnAutocompleteOpenUtil.autocompleteList.splice(index, 1);
    }
  }
  public static getList(): GlnAutocompleteComponent[] {
    return GlnAutocompleteOpenUtil.autocompleteList.slice();
  }
  public static closeAll(): void {
    GlnAutocompleteOpenUtil.autocompleteList.forEach((item: { close(value: unknown): void }) => item.close({ noAnimation: true }));
  }
}
