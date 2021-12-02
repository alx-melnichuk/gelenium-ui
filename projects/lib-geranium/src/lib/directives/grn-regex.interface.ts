export interface GrnRegex {
  name?: string;
  regex: string;
}

export class GrnRegexUtil {
  public static create(value: string | GrnRegex | null): GrnRegex | null {
    let result: GrnRegex | null = null;
    if (value != null) {
      if (typeof value === 'string') {
        result = { regex: value as string };
      } else if (typeof value === 'object' && !!value.regex) {
        result = { name: value.name, regex: value.regex };
      }
    }
    return result;
  }
}
