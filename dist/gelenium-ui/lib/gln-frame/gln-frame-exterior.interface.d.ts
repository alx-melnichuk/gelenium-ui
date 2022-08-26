export declare type GlnFrameExteriorType = 'standard' | 'outlined' | 'underline';
export declare enum GlnFrameExterior {
    standard = "standard",
    outlined = "outlined",
    underline = "underline"
}
export declare class GlnFrameExteriorUtil {
    static create(value: GlnFrameExterior | null): GlnFrameExterior;
    static convert(value: string | null): GlnFrameExterior | null;
    static isOutlined(value: GlnFrameExterior | null): boolean;
    static isUnderline(value: GlnFrameExterior | null): boolean;
    static isStandard(value: GlnFrameExterior | null): boolean;
}
