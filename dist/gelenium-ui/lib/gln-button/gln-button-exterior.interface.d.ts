export declare type GlnButtonExteriorType = 'text' | 'contained' | 'underline';
export declare enum GlnButtonExterior {
    contained = "contained",
    outlined = "outlined",
    text = "text"
}
export declare class GlnButtonExteriorUtil {
    static create(value: GlnButtonExterior | null): GlnButtonExterior;
    static convert(value: string | null): GlnButtonExterior | null;
    static isContained(value: GlnButtonExterior | null): boolean;
    static isOutlined(value: GlnButtonExterior | null): boolean;
    static isText(value: GlnButtonExterior | null): boolean;
}
