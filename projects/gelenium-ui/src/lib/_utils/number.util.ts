export class NumberUtil {
  public static str(value: number | null): string | null {
    return value != null ? value.toString() : null;
  }
  public static roundTo100(value: number): number {
    return Math.round(value * 100) / 100;
  }
  public static converInt(value: string, defaultValue: number): number {
    const valueNum: number = Number.parseInt(value);
    return !Number.isNaN(valueNum) ? valueNum : defaultValue;
  }
  public static getDigit(value: number, size: number = 2): string {
    return ('0'.repeat(size) + value.toString()).slice(-size);
  }
}
