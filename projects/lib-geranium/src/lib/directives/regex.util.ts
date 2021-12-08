/**
 * Create a regular expression object.
 */
export class RegexUtil {
  public static create(value: string | null): RegExp | null {
    let result: RegExp | null = null;
    const text = value?.trim();
    if (text) {
      const start = text.indexOf('/');
      const finish = text.lastIndexOf('/');
      if (start !== -1 && finish !== -1 && start !== finish) {
        const pattern = text.substr(start + 1, finish - 1);
        const flag: string | undefined = text.length > finish + 1 ? text.substr(finish + 1) : undefined;
        // Regex pattern with delimiters.
        result = new RegExp(pattern, flag);
      } else {
        // Regex pattern without delimiters.
        result = new RegExp(text);
      }
    }
    return result;
  }
}
