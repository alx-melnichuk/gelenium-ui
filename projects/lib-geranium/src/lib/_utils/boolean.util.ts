export class BooleanUtil {
  public static init(value: string | null): boolean | null {
    return value === '' || value === 'true' ? true : value === 'false' ? false : null;
  }
}
