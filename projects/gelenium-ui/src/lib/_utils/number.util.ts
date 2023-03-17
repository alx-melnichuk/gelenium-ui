export class NumberUtil {
  public static str(value: number | null): string | null {
    return value != null ? value.toString() : null;
  }
  public static roundTo100(value: number): number {
    return Math.round(value * 100) / 100;
  }
  public static converInt(size: string, defaultValue: number): number {
    const sizeNum: number = Number.parseInt(size);
    return !Number.isNaN(sizeNum) ? sizeNum : defaultValue;
  }
}
