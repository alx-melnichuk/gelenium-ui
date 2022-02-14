export class NumberUtil {
  public static str(value: number | undefined | null): string | null {
    return value != null ? value.toString() : null;
  }
}
