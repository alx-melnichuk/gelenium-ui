export declare const REGEX_CHECK_NAME = "regexCheck";
export declare type GlnRegexCheck = {
    [key: string]: string;
};
export declare class GlnRegexCheckUtil {
    static create(value: string | GlnRegexCheck | null): GlnRegexCheck | null;
}
