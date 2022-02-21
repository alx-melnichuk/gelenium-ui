export class NumberUtil {
  public static str(value: number | null): string | null {
    return value != null ? value.toString() : null;
  }
}
