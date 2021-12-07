export const REGEX_CHECK_NAME = 'regexpCheck';

export declare type GrnRegexCheck = { [key: string]: string };

export class GrnRegexCheckUtil {
  public static create(value: string | GrnRegexCheck | null): GrnRegexCheck | null {
    let result: GrnRegexCheck | null = null;
    if (value != null) {
      if (typeof value === 'string') {
        result = { [REGEX_CHECK_NAME]: value as string };
      } else if (typeof value === 'object') {
        result = {};
        const list = Object.keys(value);
        for (const key of list) {
          if (!value[key]) continue;
          result[key] = value[key];
        }
      }
    }
    return result;
  }
}
