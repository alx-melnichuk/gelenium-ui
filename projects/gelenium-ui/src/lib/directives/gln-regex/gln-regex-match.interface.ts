export const NAME_NUMERIC = '#numeric';
export const REGEXP_NUMERIC = '^-?(\\d+)$';

export const NAME_NUMERIC_EXP = '#numeric-exp';
export const REGEXP_NUMERIC_EXP = '^-?[\\d.]+(?:e-?\\d*)?$';

export const NAME_NUMERIC12_2 = '#numeric12_2';
export const REGEXP_NUMERIC12_2 = '^-?(\\d{1,12}(\\.\\d{0,2})?|\\.\\d{0,2})$';

export const REGEXP_REAL_NUMERIC = '^-?(\\d+(\\.\\d*)?|\\.\\d*)$';

export class GlnRegexMatchUtil {
  public static create(value: string | null): string | null {
    let result: string | null = value ? value : null;
    const realNumeric = GlnRegexMatchUtil.isRealNumeric(value || '');
    if (value) {
      switch (value) {
        case NAME_NUMERIC:
          result = REGEXP_NUMERIC;
          break;
        case NAME_NUMERIC_EXP:
          result = REGEXP_NUMERIC_EXP;
          break;
        case NAME_NUMERIC12_2:
          result = REGEXP_NUMERIC12_2;
          break;
        case !realNumeric ? '!' + value : value:
          result = REGEXP_REAL_NUMERIC;
          if (realNumeric != null) {
            const dimension = realNumeric.dimension;
            const accuracy = realNumeric.accuracy;
            if (dimension !== -1 && accuracy === -1) {
              result = `^-?\\d{1,${dimension}}$`;
            } else if (dimension !== -1 && accuracy !== -1) {
              result = `^-?(\\d{1,${dimension}}(\\.\\d{0,${accuracy}})?|\\.\\d{0,${accuracy}})$`;
            } else if (dimension === -1 && accuracy !== -1) {
              result = `^-?(\\d+(\\.\\d{0,${accuracy}})?|\\.\\d{0,${accuracy}})$`;
            }
          }
          break;
      }
    }
    return result;
  }
  public static isRealNumeric(value: string): { dimension: number; accuracy: number } | null {
    let result: { dimension: number; accuracy: number } | null = null;
    if (value && value.startsWith(NAME_NUMERIC)) {
      const valueText = value.substring(NAME_NUMERIC.length);
      const start = valueText.indexOf('(');
      const finish = valueText.indexOf(')');
      if (start !== -1 && start < finish) {
        const data = valueText.substring(start + 1, finish);
        const idx = data.indexOf(',');
        const separator = idx !== -1 ? idx : data.length;
        const dimension = Number(data.substring(0, separator)) || -1;
        const accuracy = Number(data.substring(separator + 1)) || -1;
        result = { dimension, accuracy };
      }
    }
    return result;
  }
}
