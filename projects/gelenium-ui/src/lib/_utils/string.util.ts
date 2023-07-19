export class StringUtil {
  public static camelize(value: string): string {
    return !!value ? value[0].toUpperCase() + value.slice(1) : value;
  }
}
