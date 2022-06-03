export const REGEX_CHECK_NAME = 'regexCheck';

export declare type GlnRegexCheck = { [key: string]: string };

export class GlnRegexCheckUtil {
  public static create(value: string | GlnRegexCheck | null): GlnRegexCheck | null {
    let result: GlnRegexCheck | null = null;
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
