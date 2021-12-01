/**
 * Create a regular expression object.
 */
export class RegexUtil {
  public static create(value: string | null): RegExp | null {
    let result: RegExp | null = null;
    if (value) {
      const regParts = value.match(/^\/(.*?)\/(.*?)$/);
      if (regParts !== null) {
        // Regex pattern with delimiters.
        result = new RegExp(regParts[1], regParts[2]);
      } else {
        // Regex pattern without delimiters.
        result = new RegExp(value);
      }
    }
    return result;
  }
}
