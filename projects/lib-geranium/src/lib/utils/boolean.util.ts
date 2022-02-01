export class BooleanUtil {
  public static str(value: boolean | null): string | null {
    return value != null ? value.toString() : null;
  }
  public static init(value: string | null): boolean | null {
    return value === '' || value === 'true' ? true : value === 'false' ? false : null;
  }
}
