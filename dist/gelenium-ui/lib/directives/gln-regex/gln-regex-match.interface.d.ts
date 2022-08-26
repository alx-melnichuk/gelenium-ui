export declare const NAME_NUMERIC = "#numeric";
export declare const REGEXP_NUMERIC = "^-?(\\d+)$";
export declare const NAME_NUMERIC_EXP = "#numeric-exp";
export declare const REGEXP_NUMERIC_EXP = "^-?[\\d.]+(?:e-?\\d*)?$";
export declare const NAME_NUMERIC12_2 = "#numeric12_2";
export declare const REGEXP_NUMERIC12_2 = "^-?(\\d{1,12}(\\.\\d{0,2})?|\\.\\d{0,2})$";
export declare const REGEXP_REAL_NUMERIC = "^-?(\\d+(\\.\\d*)?|\\.\\d*)$";
export declare class GlnRegexMatchUtil {
    static create(value: string | null): string | null;
    static isRealNumeric(value: string): {
        dimension: number;
        accuracy: number;
    } | null;
}
